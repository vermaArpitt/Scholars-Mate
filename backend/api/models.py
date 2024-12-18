from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class NotesModel(models.Model):
    title = models.CharField(max_length = 100)
    original_text = models.TextField()
    summarized_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title
    
class QnaModel(models.Model):
    context = models.TextField(null=True, blank=True)
    question_text = models.TextField()
    answer_text = models.TextField(blank=True, null=True)
    note = models.ForeignKey(NotesModel, on_delete=models.CASCADE, related_name="qna")
    created_at = models.DateTimeField(auto_now_add=True)