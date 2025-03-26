from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from .serializers import SignupSerializer, UserDataSerializer
from django.contrib.auth import get_user_model, authenticate
from rest_framework.exceptions import ValidationError
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from jobs.models import JobSearch
from jobs.serializers import JobSearchSerializer
import json

User = get_user_model()

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response(
                {"detail": "Please provide both username and password."},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(username=username, password=password)
        
        if user is None:
            return Response(
                {"detail": "Invalid credentials."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Get user data
        user_data = UserDataSerializer(user).data
        
        # Get user preferences (you can add this to your User model)
        preferences = {
            "job_types": ["full-time", "part-time", "contract"],
            "locations": ["remote", "hybrid"],
            "experience_level": "entry"
        }
        
        # Get saved jobs
        try:
            saved_jobs = JobSearch.objects.filter(user=user)
            saved_jobs_data = JobSearchSerializer(saved_jobs, many=True).data
        except JobSearch.DoesNotExist:
            saved_jobs_data = []

        # Generate tokens
        from rest_framework_simplejwt.tokens import RefreshToken
        refresh = RefreshToken.for_user(user)
        
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "email": user.email,
            "preferences": preferences,
            "saved_jobs": saved_jobs_data
        })

class SignupView(CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        try:
            serializer.save()
        except Exception as e:
            raise ValidationError({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class DeleteUserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        if not user:
            raise ValidationError({"error": "User not found"})
        user.delete()
        return Response({"message": "User deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


class UpdateUserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        user = request.user
        former_email = user.email
        updated_email = request.data['email']

        # check if email in request body
        if not updated_email:
            return Response({"message": "please input valid email"}, status=status.HTTP_400_BAD_REQUEST)
        
        # check if a valid email format
        try:
            validate_email(updated_email)
        except ValidationError:
            return Response({"message": "Invalid email format."}, status=status.HTTP_400_BAD_REQUEST)


        user.email = updated_email
        user.save()
        return Response({"message": f"user email changed from {former_email} to {user.email}"})

class GetSearchData(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        jobs = JobSearch.objects.filter(user=request.user)
        jobs_serialized = JobSearchSerializer(jobs, many=True).data
        return Response(jobs_serialized)

