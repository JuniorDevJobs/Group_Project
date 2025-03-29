import requests
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings
from django.http import JsonResponse
from django.core.cache import cache
import os
from dotenv import load_dotenv
from .models import JobSearch, IndeedJobListings
from django.core.cache import cache
from django.core.exceptions import SuspiciousOperation
from django.db.models import Q

# used to see outputs in web service for debugging because print statments not showing
import logging
logger = logging.getLogger(__name__)

load_dotenv()

FINDWORK_API_KEY = os.getenv("FINDWORK_API_KEY").strip()
APIFY_API_TOKEN = os.getenv("APIFY_API_TOKEN").strip()
ACTOR_RUN_URL = f"https://api.apify.com/v2/acts/misceres~indeed-scraper/runs?token={APIFY_API_TOKEN}"

@api_view(['GET'])
# @authentication_classes([JWTAuthentication])  # Check for JWT token only if you want search to be login only
@permission_classes([])  # Allow public access
def search_jobs(request):
    title = request.GET.get("title", "").strip().lower()
    location = request.GET.get("location", "").strip().lower()
    source = request.GET.get("source", "").strip()

    logger.info(f"Authenticated user: {request.user}")
    logger.debug("Fetching jobs from external API...")

    if not title:
        return JsonResponse({"error": "Job title is required"}, status=400)

    user = request.user if request.user.is_authenticated else None
    logger.info(f"Authenticated user: {user if user else 'Anonymous'}")

    cache_key = f"job_search_{title}_{location}_{source}"
    cached_data = cache.get(cache_key)

    if cached_data:
        return JsonResponse({'cached_jobs': cached_data})
    
    findwork_jobs = []
    url = "https://findwork.dev/api/jobs/"
    headers = {"Authorization": f"Token {FINDWORK_API_KEY}"}
    params = {"search": title, "location": location}

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        data = response.json()

        findwork_jobs = [
            {
                "title": job.get("role"),
                "location": job.get("location"),
                "company": job.get("company_name"),
                "description": job.get("text"),
                "url": job.get("url"),
                "source": "Findwork"
            }
            for job in data.get("results", [])
        ]       

        # If user is logged in, save the search to the JobSearch table
        if not user:
            logger.info("User is not authenticated, job search will not be saved.")
        else:
            logger.info(f"Saving job search for user: {user.username}, title: {title}, location: {location}")
            JobSearch.objects.filter(user=user).delete() # delete old data under user
            for job in findwork_jobs:
                try:
                    job_search = JobSearch.objects.create(
                        user=user,
                        title=job.get("title", "Unknown Title"),
                        location=job.get("location", "Unknown Location"),
                        company=job.get("company", "Unknown Company"),
                        description=job.get("description", ""),
                        url=job.get("url", ""),
                        source=job.get("source", "Unknown Source")
                    )
                    logger.info(f"Job search saved: {job_search}")
                except Exception as e:
                    logger.debug(f"Error saving job search: {e}")
        if 'developer' in title: 
            indeed_db_jobs = IndeedJobListings.objects.filter(
                Q(location__icontains=location) 
            )
        else:
            indeed_db_jobs = []

        indeed_jobs = [
            {
                "title": job.title,
                "company": job.company,
                "location": job.location,
                "description": job.description,
                "url": job.url,
                "source": "Indeed"
            }
            for job in indeed_db_jobs
        ]

        all_jobs = findwork_jobs + indeed_jobs

        if source == "Findwork":
            cache.set(cache_key, findwork_jobs, timeout=600)
            return JsonResponse({"jobs": findwork_jobs})
        elif source == "Indeed":
            cache.set(cache_key, indeed_jobs, timeout=600)
            return JsonResponse({"jobs": indeed_jobs})
        else:
            cache.set(cache_key, all_jobs, timeout=600)
            return JsonResponse({"jobs": all_jobs})

    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": str(e)}, status=500)
