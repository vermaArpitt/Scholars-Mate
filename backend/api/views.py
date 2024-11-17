from django.shortcuts import render
from django.contrib.auth.models import User
from .models import NotesModel
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from .serializers import UserSerializer, NotesSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .utils import YoutubeSummarizer, PDFSummarizer

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

class CreateNotesView(APIView):
    def post(self, request, *args, **kwargs):
        title = request.data.get('title')
        link = request.data.get('link')
        pdf_file = request.FILES.get('file')

        if link :
            try:
                original_text, summarized_text = YoutubeSummarizer(link)
            except Exception as e:
                return Response({"error": f"Error processing YouTube link: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
            
        elif pdf_file:
            try:
                original_text, summarized_text = PDFSummarizer(pdf_file)
            except Exception as e:
                return Response({"error": f"Error processing PDF File: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
            
        else:
            return Response({"error": "Either a YouTube link or a PDF file is required."}, status=status.HTTP_400_BAD_REQUEST)

        note = NotesModel.objects.create(
            title=title,
            original_text=original_text,
            summarized_text=summarized_text,
            author=request.user
        )

        serializer = NotesSerializer(note)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class DeleteNotesView(APIView):
    def delete(self, request, *args, **kwargs):
        id = kwargs.get('id')

        if not id:
            return Response({"error": "Note ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        note = NotesModel.objects.get(id=id, author=request.user)

        note.delete()

        return Response({"message": "Note deleted successfully."}, status=status.HTTP_204_NO_CONTENT)