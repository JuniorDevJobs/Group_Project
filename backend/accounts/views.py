
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from .serializers import SignupSerializer
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from jobs.models import JobSearch
from django.core.serializers import serialize
import json

User = get_user_model()
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
        jobs = JobSearch.objects.get()
        jobs_serialized = serialize("json", jobs)
        jobs_json = json.loads(jobs_serialized)

        return Response(jobs_json)

