from django.db import models
from django.conf import settings

class JobSearch(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    job_title = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True),
    job_url_link = models.URLField(null=True, blank=True)  
    search_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.job_title} in {self.location} {self.job_url_link} searched by {self.user.username}"


class IndeedJobListings(models.Model):
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    description = models.TextField()
    url = models.URLField()