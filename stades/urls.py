from django.urls import path,include
from . import views

urlpatterns=[
    path('stades',views.stades,name="stades"),
    path('submitStades',views.submitStades,name="submitStades"),
    path("get_data_stades",views.get_data_stades,name="get_data_stades"),
    path("loadDemoData",views.loadDemoData,name="loadDemoData")
]