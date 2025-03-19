from django.db import models
from django.conf import settings

class JobSearch(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    job_title = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True)
    search_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.job_title} in {self.location} by {self.user.username}"
