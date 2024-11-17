from django.urls import path 
from .views import NotesListView, CreateNotesView, DeleteNotesView

urlpatterns = [
    path('notes/', NotesListView.as_view(), name="get-notes"),
    path('summarize/', CreateNotesView.as_view(), name="summarize"),
    path('notes/delete/<int:id>/', DeleteNotesView.as_view(), name="delete-notes")
]