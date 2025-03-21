import requests
from django.conf import settings
from django.http import JsonResponse
from django.core.cache import cache
import os
from dotenv import load_dotenv
from .models import JobSearch
from django.core.cache import cache
from django.core.exceptions import SuspiciousOperation

load_dotenv()

FINDWORK_API_KEY = os.getenv("FINDWORK_API_KEY").strip()
APIFY_API_TOKEN = "apify_api_JeRbOtaooOMaBHJpalmHjJGzayDiBt2Kj1qJ" # website that hosts "actors" such as the indeed scraper
ACTOR_RUN_URL = f"https://api.apify.com/v2/acts/misceres~indeed-scraper/runs?token={APIFY_API_TOKEN}"

def search_jobs(request):
    job_title = request.GET.get("job_title", "").strip().lower()
    location = request.GET.get("location", "").strip().lower()

    if not job_title:
        return JsonResponse({"error": "Job title is required"}, status=400)

    user = request.user if request.user.is_authenticated else None
    cache_key = f"job_search_{job_title}_{location}"
    cached_data = cache.get(cache_key)

    if cached_data:
        return JsonResponse(cached_data)

    url = "https://findwork.dev/api/jobs/"
    headers = {"Authorization": f"Token {FINDWORK_API_KEY}"}
    params = {"search": job_title, "location": location}

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        data = response.json()

        jobs = [
            {
                "job_title": job.get("job_title"),
                "location": job.get("location"),
                "job_url_link": job.get("url") 
            }
            for job in data.get("results", [])
        ]       

        # If user is logged in, save the search to the database
        if user:
            print(f"Saving job search for user: {user.username}, title: {job_title}, location: {location}")
            for job in jobs:
                job_search = JobSearch.objects.create(
                    user=user,
                    job_title=job["job_title"],
                    location=job["location"],
                    job_url_link=job["job_url_link"] 
                )
                print(f"Job search saved: {job_search}")

        cache.set(cache_key, jobs, timeout=600)

        return JsonResponse({"jobs": jobs})

    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": str(e)}, status=500)

