from django.contrib import admin
from django.urls import path,include
from . import views
urlpatterns = [
    path('category',views.category,name="category"),   
    path('submitCategory',views.submitCategory,name="submitCategory"),
    path('getParentCategory',views.getParentCategory,name="getParentCategory"),
    path("get_data",views.get_data,name="get_data"),
    path("deleteCategory",views.deleteCategory,name="deleteCategory")
]