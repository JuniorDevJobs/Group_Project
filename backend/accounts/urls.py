from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import SignupView, DeleteUserView

urlpatterns = [
    path('get-token', obtain_auth_token), #POST request
    path('signup', SignupView.as_view(), name='signup'),
    path('deleteUser', DeleteUserView.as_view(), name='deleteUser')
]
