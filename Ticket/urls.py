from django.urls import path,include
from . import views

urlpatterns=[
       path('ticket',views.ticket,name="ticket"),
       path('get_data_ticket',views.get_data_ticket,name="get_data_ticket"),
       path('submitTicket',views.submitTicket,name="submitTicket"),
       path("get_data_tickets",views.get_data_tickets,name="get_data_tickets")
]