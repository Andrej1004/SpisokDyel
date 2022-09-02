from django.shortcuts import render
from django.contrib.auth.models import User
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import authenticate
from .models import UsersTasks
from datetime import datetime

def index (request):
    return render(request, 'index.html')

@csrf_exempt
def SetNewTaskState(request):
    try:
        if request.method == "POST":
            usersTasks = list(UsersTasks.objects.all())
            getTasksDict = json.loads(request.body)
            for userTask in usersTasks:
                if (userTask.author == getTasksDict["author"] and userTask.task_id == getTasksDict["taskID"]):
                    userTask.state = getTasksDict['state']
                    userTask.save()
            return JsonResponse({"msg":"ok"})
    except:
        return JsonResponse({'msg': 'smth went wrong2'})

@csrf_exempt
def EditTask(request):
    try:
        if request.method == "POST":
            usersTasks = list(UsersTasks.objects.all())
            getTasksDict = json.loads(request.body)
            for userTask in usersTasks:
                if (userTask.author == getTasksDict["author"] and userTask.task_id == getTasksDict["taskID"]):
                    userTask.taskTitle = getTasksDict['taskTitle']
                    userTask.taskText = getTasksDict['taskText']
                    userTask.save()
            return JsonResponse({"msg":"ok"})
    except:
        return JsonResponse({'msg': 'smth went wrong2'})

@csrf_exempt
def DeleteAccount(request):
    try:
        if request.method == "POST":
            userName = json.loads(request.body)
            u = User.objects.get(username = userName["author"])
            u.delete()
            usersTasks = list(UsersTasks.objects.all())
            for userTask in usersTasks:
                if (userTask.author == userName["author"]):
                    userTask.delete()
            return JsonResponse({"msg":"ok"})
    except:
        return JsonResponse({'msg': 'smth went wrong2'})

@csrf_exempt
def DeleteTask(request):
    try:
        if request.method == "POST":
            usersTasks = list(UsersTasks.objects.all())
            getTasksDict = json.loads(request.body)
            for userTask in usersTasks:
                if (userTask.author == getTasksDict["author"] and userTask.task_id == getTasksDict["taskID"]):
                    userTask.delete()
            return JsonResponse({"msg":"ok"})
    except:
        return JsonResponse({'msg': 'smth went wrong2'})

@csrf_exempt
def GetTasks(request):
    try:
        if request.method == "POST":
            usersTasks = list(UsersTasks.objects.all())
            getTasksDict = json.loads(request.body)
            Tasks = { }
            for userTask in usersTasks:
                if (userTask.author == getTasksDict["author"]):
                    Tasks["task"+str(userTask.task_id)] = {"id": userTask.task_id, "state": str(userTask.state),"title": str(userTask.taskTitle),"text": str(userTask.taskText)}
            return JsonResponse(Tasks)
    except:
        return JsonResponse({'msg': 'smth went wrong2'})

@csrf_exempt
def AddNewTask(request):
    try:
        if request.method == "POST":
            print("ok")
            userTask = UsersTasks()
            userTaskDict = json.loads(request.body)
            userTask.author = userTaskDict['author']
            userTask.state = userTaskDict['state']
            userTask.taskTitle = userTaskDict['taskTitle']
            userTask.taskText = userTaskDict['taskText']
            userTask.date = datetime.now()
            userTask.task_id = int(userTaskDict['taskID'])
            userTask.save()
            return JsonResponse({'data': '1yes'})
    except:
        return JsonResponse({'msg': 'smth went wrong2'})

def CheckCanBeRegistered (userDict):
    users = list(User.objects.all())
    if (userDict['password1'] != userDict['password2']):
        return [False,"не совпадают пароли"]
    for user in users:
        if (userDict['name'] == user.username):
            return [False,"имя уже используется"]
        if (userDict['mail'] == user.email):
            return [False,"почта уже используется"]
    return [True,"зарегистрирован"]

@csrf_exempt
def RegisterNewUser(request):
    try:
        if request.method == "POST":
            userDict = json.loads(request.body)
            checkValue = CheckCanBeRegistered (userDict)
            if ( checkValue[0] ):
                user = User.objects.create_user(userDict['name'],userDict['mail'],userDict['password1'])
                user.save()
                print(checkValue)
                return JsonResponse({'isAuth': 'yes','msg': checkValue[1]})
            else:
                print(checkValue)
                return JsonResponse({'isAuth': 'no','msg': checkValue[1]})
    except:
        return JsonResponse({'msg': 'smth went wrong'})

@csrf_exempt
def UserLogin(request):
    try:
        print("I m working!")
        if request.method == "POST":
            userDict = json.loads(request.body)
            print(userDict)
            print(userDict['name'], userDict['password'])
            user = authenticate(username=userDict['name'], password=userDict['password']) # обязательно в виде: username=userDict['name'], password=userDict['password']
            if (user is not None):
                print("Ok-2")
                return JsonResponse({'isAuth': 'yes'})
            else:
                print("Ok-1")
                return JsonResponse({'isAuth': 'no'})
    except:
        return JsonResponse({'msg': 'smth went wrong'})
