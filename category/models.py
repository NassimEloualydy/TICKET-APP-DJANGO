from django.db import models

# Create your models here.
class Category(models.Model):
    name=models.CharField(max_length=200,null=True,blank=True)
    parent_category=models.ForeignKey('self',on_delete=models.CASCADE,null=True, blank=True)
    display_name=models.CharField(max_length=200,default="",null=True,blank=True)

    def __str__(self):
        return self.name