from django.urls import path,include
from . import views

urlpatterns=[
    path('events',views.events,name="events"),
    path('get_data_events',views.get_data_events,name="get_data_events"),
    path('submitEvent',views.submitEvent,name="submitEvent"),
    path('loadDemoDataEvent',views.loadDemoData,name="loadDemoDataEvent"),
    path("deleteEvent",views.deleteEvent,name="deleteEvent"),
    path("chart_number_of_event_by_stade",views.chart_number_of_event_by_stade,name="chart_number_of_event_by_stade")
]