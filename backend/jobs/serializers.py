from rest_framework import serializers
from .models import JobSearch

class JobSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobSearch
        fields = ['id', 'title', 'company', 'location', 'url', 'description', 'search_date', 'source'] 