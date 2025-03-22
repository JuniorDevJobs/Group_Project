from django.db import models
from django.conf import settings
class JobSearch(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255, null=True, blank=True)
    location = models.CharField(max_length=255, blank=True)
    url = models.URLField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    search_date = models.DateTimeField(auto_now_add=True)
    source = models.CharField(max_length=500, default="All") # e.g., All, Indeed, Findwork

    def __str__(self):
        return f"{self.title} in {self.location} {self.url} searched by {self.user.username}"

class IndeedJobListings(models.Model):
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    description = models.TextField()
    url = models.URLField()