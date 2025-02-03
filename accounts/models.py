from django.db import models

# Create your models here.
class Account(models.Model):
    first_name=models.CharField(max_length=80)
    last_name=models.CharField(max_length=80)
    role=models.CharField(max_length=80)
    email=models.CharField(max_length=80)
    phone=models.CharField(max_length=80)
    password=models.CharField(max_length=80)
    photo=models.ImageField(upload_to='photos/%y/%m/%d/')

    def __str__(self):
        return self.first_name+" "+self.last_name