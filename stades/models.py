from django.db import models

# Create your models here.
class Stade(models.Model):
    name=models.CharField(max_length=100)
    city=models.CharField(max_length=100)
    country=models.CharField(max_length=100)
    location=models.CharField(max_length=100)
    photo_location=models.ImageField(upload_to='stades/%y/%m/%d/')
    status=models.CharField(max_length=100)
    nbr_places=models.CharField(max_length=100)
    def __str__(self):
        return self.name

    

    