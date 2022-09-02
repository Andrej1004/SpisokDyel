from django.urls import path
from . import views

urlpatterns = [
    path('',views.index,name='index'),
    path('enter/',views.index,name='index'),
    path('register/',views.index,name='index'),
    path('try/',views.index,name='index'),
    path('app/',views.index,name='index'),
    path('RegisterNewUser/',views.RegisterNewUser),
    path('Login/',views.UserLogin),
    path('AddNewTask/',views.AddNewTask),
    path('GetTasks/',views.GetTasks),
    path('DeleteTask/',views.DeleteTask),
    path('EditTask/',views.EditTask),
    path('SetNewTaskState/',views.SetNewTaskState),
    path('DeleteAccount/',views.DeleteAccount),
]
