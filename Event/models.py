from django.db import models

# Create your models here.
from django.db import models
from django.utils import timezone
from category.models import Category
from stades.models import Stade

# Create your models here.
class Event(models.Model):
    name=models.CharField(max_length=50)
    date=models.DateField()
    time_start=models.TimeField()
    time_end=models.TimeField()
    nbr_ticket=models.CharField()
    state=models.CharField(default="Open")
    stade=models.ForeignKey(Stade,on_delete=models.CASCADE)    
    category=models.ForeignKey(Category,on_delete=models.CASCADE)    

    created_at = models.DateTimeField(default=timezone.now)  
    modified_at = models.DateTimeField(default=timezone.now) 
    

    