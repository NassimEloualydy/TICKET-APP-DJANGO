from django.urls import path,include
from . import views

urlpatterns=[
       path('ticket',views.ticket,name="ticket"),
       path('get_data_ticket',views.get_data_ticket,name="get_data_ticket")

]