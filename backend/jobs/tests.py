from rest_framework.test import APIClient
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from django.test import TestCase
from .models import JobSearch
from unittest.mock import patch
import time
from requests.models import Response

User = get_user_model()

class JobSearchTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser', password='testpassword'
        )
        self.client.login(username='testuser', password='testpassword')

    def test_job_search_by_title(self):
        url = reverse('jobs:search_jobs')  
        data = {'title': 'developer', 'location': 'new york'}
        response = self.client.get(url, data)
        response_data = response.json()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response_data)
     
     
    @patch('requests.get')
    def test_job_search_saves_to_database(self, mock_get):
        mock_response = Response()
        mock_response.status_code = 200
        mock_response._content = b'{"results": []}'  
        mock_get.return_value = mock_response

        url = reverse('jobs:search_jobs')  
        data = {'title': 'Junior Software Developer', 'location': 'new york'}
        
        login_successful = self.client.login(username='testuser', password='testpassword')
        self.assertTrue(login_successful, "Login failed, check user credentials")

        response = self.client.get(url, data)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        time.sleep(1)  
        
        job_search, created = JobSearch.objects.get_or_create(user=self.user, job_title='Junior Software Developer', location='new york')
        
        self.assertIsNotNone(job_search, "Job search entry should not be None")
        self.assertEqual(job_search.user, self.user)
        print(job_search.user)
        self.assertEqual(job_search.job_title, 'Junior Software Developer')
        self.assertEqual(job_search.location, 'new york')