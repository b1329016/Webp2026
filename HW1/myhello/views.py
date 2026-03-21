from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Post, Course_table
from django.core.serializers.json import DjangoJSONEncoder
import json
import logging

logger=logging.getLogger('django')

@api_view(['GET'])
def add_post(request):
    title = request.GET.get('title', '')
    content = request.GET.get('content', '')
    photo = request.GET.get('photo', '')
    location = request.GET.get('location', '')
    
    new_post = Post()
    new_post.title = title
    new_post.content = content
    new_post.photo = photo
    new_post.location = location
    new_post.save()
    
    logger.debug("************** myhello_api: " + title)
    if title:
        return Response({"data": title + " insert!"}, status=status.HTTP_200_OK)
    else:
        return Response({"res": "parameter: name is None"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_post(request):
    posts = Post.objects.all().values()
    return JsonResponse(list(posts), safe=False)


from .models import User
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

@api_view(['GET'])
def list_users(request):
    page = request.GET.get('page', 1)
    users = User.objects.all().values()
    
    paginator = Paginator(users, 10)
    
    try:
        users = paginator.page(page)
    except PageNotAnInteger:
        users = paginator.page(1)
    except EmptyPage:
        users = paginator.page(paginator.num_pages)
        
    return JsonResponse(list(users), safe=False)

@api_view(['GET'])
def add_course(request):
    
    dept = request.GET.get('Department', '')
    title = request.GET.get('CourseTitle', '')
    teacher = request.GET.get('Instructor', '')
    
   
    
    new_course = Course_table()
    new_course.Department = dept
    new_course.CourseTitle = title
    new_course.Instructor = teacher
   
    new_course.save()
    
    logger.debug("************** myhello_api: " + title)
    if title:
        return Response({"data": title + " insert!"}, status=status.HTTP_200_OK)
    else:
        return Response({"res": "parameter: name is None"}, status=status.HTTP_400_BAD_REQUEST)
    
   
    return Response({"res": f"課程 {title} 已成功新增！"}, status=status.HTTP_200_OK)

@api_view(['GET'])
def list_courses(request):
    
    courses = Course_table.objects.all().values()
    return JsonResponse(list(courses), safe=False)
    