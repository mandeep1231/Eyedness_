from django.urls import path

from . import views

urlpatterns = [
    path('register' , views.acct , name='acct'),
    path('login/',views.login , name='login'),
    path('webcam/' , views.webcam , name='webcam'),
    path('logout/' , views.logout , name='logout'),
    path('public/' , views.public , name='public'), 
    path('voice/' , views.voice , name='voice'), 
]