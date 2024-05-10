# urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('eyedisease/', views.eyedisease, name='eyedisease'),
    path('history/', views.history, name='history'),
    path('chat/', views.chat, name='chat'),
    path('dashboard/', views.dashboard, name='dashboard'),
]
