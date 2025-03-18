from rest_framework import serializers
from django.contrib.auth.models import User

class SignupSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=20)
    password = serializers.CharField(write_only=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
    
    def create(self, validated_data):
        user_data = {
            'username': validated_data['username'],
            'password': validated_data['password']
        }

        user = User.objects.create_user(**user_data)
    
        return user