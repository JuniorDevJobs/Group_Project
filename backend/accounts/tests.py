from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from django.test import TestCase
from jobs.models import JobSearch

User = get_user_model()

class AccountTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword',
            email='testuser@gmail.com'
        )
        self.job_search = JobSearch.objects.create(
            user=self.user,
            title='Developer',
            location='New York',
        )

    def test_signup(self):
        url = reverse('accounts:signup') 
        data = {
            'username': 'newuser',
            'password': 'newpassword',
            'email': 'newuser@gmail.com'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)  # Original user + new user
        self.assertEqual(User.objects.get(username='newuser').email, 'newuser@gmail.com')

    def test_login(self):
        url = reverse('accounts:login')  
        data = {
            'username': 'testuser',
            'password': 'testpassword'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertIn('email', response.data)
        self.assertIn('preferences', response.data)
        self.assertIn('saved_jobs', response.data)
        # Verify saved jobs data
        self.assertEqual(len(response.data['saved_jobs']), 1)
        self.assertEqual(response.data['saved_jobs'][0]['title'], 'Developer')

    def test_delete_user(self):
        # First login to get the token
        login_url = reverse('accounts:login')
        login_data = {
            'username': 'testuser',
            'password': 'testpassword'
        }
        login_response = self.client.post(login_url, login_data, format='json')
        token = login_response.data['access']
        
        # Set the authentication token
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        
        # Test delete user endpoint
        url = reverse('accounts:delete_user')
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
        # Verify user is deleted
        self.assertEqual(User.objects.count(), 0)
        # Verify associated job searches are deleted
        self.assertEqual(JobSearch.objects.count(), 0)

    def test_update_user(self):
        login_url = reverse('accounts:login')
        login_data = {
            'username': 'testuser',
            'password': 'testpassword'
        }
        login_response = self.client.post(login_url, login_data, format='json')
        token = login_response.data['access']
        
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        
        url = reverse('accounts:update-user')
        data = {
            'email': 'updated@test.com'
        }
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        updated_user = User.objects.get(username='testuser')
        self.assertEqual(updated_user.email, 'updated@test.com')

    def test_get_searches(self):
        login_url = reverse('accounts:login')
        login_data = {
            'username': 'testuser',
            'password': 'testpassword'
        }
        login_response = self.client.post(login_url, login_data, format='json')
        token = login_response.data['access']
        
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        
        url = reverse('accounts:get-searches')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Developer')
        self.assertEqual(response.data[0]['location'], 'New York')

    def test_invalid_login(self):
        url = reverse('accounts:login')
        data = {
            'username': 'testuser',
            'password': 'wrongpassword'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_unauthorized_access(self):
        urls = [
            reverse('accounts:delete_user'),
            reverse('accounts:update-user'),
            reverse('accounts:get-searches')
        ]
        
        for url in urls:
            response = self.client.get(url)
            self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
