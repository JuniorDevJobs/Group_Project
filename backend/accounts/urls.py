from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import SignupView, DeleteUserView, UpdateUserView

app_name = 'accounts' 

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Get JWT
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh JWT
    path('signup/', SignupView.as_view(), name='signup'), 
    path('delete-user/', DeleteUserView.as_view(), name='delete_user'),
    path('update-user/', UpdateUserView.as_view(), name='update-user'),
]
