from django.urls import path
from . import views

urlpatterns = [
    path('addcourse', views.add_course, name='add_course'), 
    path('courselist', views.list_courses, name='list_courses'), 
    #path('users', views.list_users, name='list_users'),
]