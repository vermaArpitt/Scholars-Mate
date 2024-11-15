from django.urls import path 
from .views import NotesListView, NotesYoutubeView

urlpatterns = [
    path('notes/', NotesListView.as_view(), name="get-notes"),
    path('summarize/youtube/', NotesYoutubeView.as_view(), name="youtube-summary"),
]