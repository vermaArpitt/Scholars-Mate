from django.shortcuts import render
from django.contrib.auth.models import User
from .models import NotesModel
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from .serializers import UserSerializer, NotesSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .utils import YoutubeSummarizer

# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class NotesListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notes = NotesModel.objects.filter(author=request.user)
        serializer = NotesSerializer(notes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class NotesYoutubeView(APIView):
    def post(self, request, *args, **kwargs):
        title = request.data.get('title')
        link = request.data.get('link')

        original_text, summarized_text = YoutubeSummarizer(link)

        note = NotesModel.objects.create(
            title=title,
            original_text=original_text,
            summarized_text=summarized_text,
            author=request.user
        )

        serializer = NotesSerializer(note)
        return Response(serializer.data, status=status.HTTP_201_CREATED)