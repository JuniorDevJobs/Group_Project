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

def search_jobs(request):
    job_title = request.GET.get("title", "").strip().lower()
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
    params = {"search": job_title, "location": location, "limit": 10}

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        data = response.json()

        # If user is logged in, save the search to the database
        if user:
            print(f"Saving job search for user: {user.username}, title: {job_title}, location: {location}")
            job_search = JobSearch.objects.create(user=user, job_title=job_title, location=location)
            print(f"Job search saved: {job_search}")

        # Cache and return the response
        cache.set(cache_key, data, timeout=600)
        return JsonResponse(data)

    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": str(e)}, status=500)
