from rest_framework.generics import CreateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from .serializers import SignupSerializer
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError

User = get_user_model()
class SignupView(CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        try:
            serializer.save()
        except Exception as e:
            raise ValidationError({"error": str(e)})


class DeleteUserView(DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        if not user:
            raise ValidationError({"error": "User not found"})
        return user
