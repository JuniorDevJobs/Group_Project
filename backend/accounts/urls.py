from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import SignupView, DeleteUserView, UpdateUserView, GetSearchData, LoginView

app_name = 'accounts' 

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),  # Custom login with user data
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh JWT
    path('signup/', SignupView.as_view(), name='signup'), 
    path('delete-user/', DeleteUserView.as_view(), name='delete_user'),
    path('update-user/', UpdateUserView.as_view(), name='update-user'),
    path('get-searches/', GetSearchData.as_view(), name='get-searches')
]
