from django.shortcuts import render
from django.contrib.auth.models import User
from .models import NotesModel, QnaModel
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from .serializers import UserSerializer, NotesSerializer, QnaSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .utils import YoutubeSummarizer, PDFSummarizer, AudioSummarizer

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
        pdf_file = request.FILES.get('pdf_file')
        audio_file = request.FILES.get('audio_file')

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
        
        elif audio_file:
            try:
                original_text, summarized_text = AudioSummarizer(audio_file)
            except Exception as e:
                return Response({"error": f"Error processing Audio File: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

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
    
class QnaView(APIView):
    def get(self, request):
        note_id = request.query_params.get('note')  # Get 'note' parameter from query string
        if note_id:
            qna_objects = QnaModel.objects.filter(note_id=note_id)  # Filter by 'note' field
        else:
            qna_objects = QnaModel.objects.all()  # Return all entries if no filter is provided

        serializer = QnaSerializer(qna_objects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        context = request.data.get('context')
        note_id = request.data.get('note')
        question_text = request.data.get('question')

        try:
            note = NotesModel.objects.get(pk=note_id)
        except NotesModel.DoesNotExist:
            return Response({"error": "Invalid note ID"}, status=status.HTTP_400_BAD_REQUEST)

        answer_text = "Response"

        qna = QnaModel.objects.create(
            context=context,
            question_text=question_text,
            answer_text=answer_text,
            note=note
        )

        serializer = QnaSerializer(qna)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
