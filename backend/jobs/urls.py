from django.urls import path
from .views import search_jobs

app_name = 'jobs' 

urlpatterns = [
    path('search/', search_jobs, name='search_jobs'),
]
