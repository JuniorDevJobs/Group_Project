from django.shortcuts import render
from rest_framework.generics import CreateAPIView, DestroyAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.views import APIView, Response
from .serializers import SignupSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status


# Create your views here.
class SignupView(CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        try:
            serializer.save()
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class DeleteUserView(DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    
    def perform_destroy(self, instance):
        instance.delete()
    
    def delete(self, request, *args, **kwargs):
        try:
            instance = self.get_object() 
            self.perform_destroy(instance) 
            return Response({"message": "User removed successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
