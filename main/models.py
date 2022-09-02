from django.db import models

class UsersTasks (models.Model):
    author = models.CharField('Пользователь',max_length=50)
    task_id = models.IntegerField('внутреннее id задания',default=0)
    state = models.CharField('состояние',max_length=50)
    date = models.DateTimeField('Дата добавления')
    taskTitle = models.CharField('Название задания',max_length=100)
    taskText = models.TextField('Тект задания')
    
