from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from django.test import TestCase

User = get_user_model()

class AccountTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_signup(self):
        url = reverse('accounts:signup') 
        data = {
            'username': 'testuser',
            'password': 'testpassword',
            'email': 'testuser@gmail.com'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, 'testuser')

    def test_login(self):
        self.test_signup()
        url = reverse('accounts:token_obtain_pair')  
        data = {
            'username': 'testuser',
            'password': 'testpassword'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)  
