from django.db import models
from accounts.models import Account
from Event.models import Event
# Create your models here.
class Ticket(models.Model):
    name=models.CharField(max_length=140)
    status=models.CharField(max_length=140,default="")
    date=models.DateTimeField()
    availble=models.BooleanField()
    desired_price=models.FloatField()
    cost_price=models.FloatField(default=0)
    etickets_count=models.IntegerField(default=0)
    saller=models.ForeignKey(Account,on_delete=models.CASCADE)
    event=models.ForeignKey(Event,on_delete=models.CASCADE)
    searial=models.CharField(max_length=500)

