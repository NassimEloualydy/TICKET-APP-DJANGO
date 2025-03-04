from django.urls import path,include
from . import views

urlpatterns=[
    path('events',views.events,name="events"),
    path('get_data_events',views.get_data_events,name="get_data_events"),
    path('submitEvent',views.submitEvent,name="submitEvent"),
    path('loadDemoDataEvent',views.loadDemoData,name="loadDemoDataEvent")
]