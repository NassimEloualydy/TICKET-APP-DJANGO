from django.urls import path,include
from . import views

urlpatterns=[
       path('ticket',views.ticket,name="ticket"),
       path('get_data_ticket',views.get_data_ticket,name="get_data_ticket"),
       path('submitTicket',views.submitTicket,name="submitTicket"),
       path("get_data_tickets",views.get_data_tickets,name="get_data_tickets"),
       path("loadDemoDataTicket",views.loadDemoDataTicket,name="loadDemoDataTicket"),
       path('deleteTicket',views.deleteTicket,name="deleteTicket"),
       path("chart_number_of_ticket_by_event",views.chart_number_of_ticket_by_event,name="chart_number_of_ticket_by_event"),
       path("get_data_home",views.get_data_home,name="get_data_home")
]