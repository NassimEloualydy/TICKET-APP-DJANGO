from django.urls import path,include
from . import views

urlpatterns=[
    path('stades',views.stades,name="stades"),
    path('submitStades',views.submitStades,name="submitStades"),
    path("get_data_stades",views.get_data_stades,name="get_data_stades"),
    path("loadDemoData",views.loadDemoData,name="loadDemoData"),
    path("deleteStade",views.deleteStade,name="deleteStade"),
    path('chart_number_of_staduims_by_city',views.chart_number_of_staduims_by_city,name="chart_number_of_staduims_by_city"),
    path('chart_number_of_staduims_by_status',views.chart_number_of_staduims_by_status,name="chart_number_of_staduims_by_status")
]