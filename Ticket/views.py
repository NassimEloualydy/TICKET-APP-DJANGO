from django.shortcuts import render
from accounts.models import  Account
from Event.models import Event
from django.http import JsonResponse
from django.db import connection
from bs4 import BeautifulSoup
from .models import Ticket
import json
import requests
import hashlib

# Create your views here.
def ticket(request):
    return render(request,"ticket.html")
def load_dumy_users(request):
    url="https://m.imdb.com/title/tt4154796/fullcredits/cast"
    response=requests.get(url)
    soop=BeautifulSoup(response.text,"html.parser")
    card=soop.find_all('div',class_="media-body media-vertical-align")
    i=0
    for rec in card:
        first_name=rec.find('h4').text.split(" ")[0]
        last_name=rec.find('h4').text.split(" ")[1]
        email=rec.find('h4').text.split(" ")[0]+"@gmail.com"
        password=str(rec.find('h4').text.split(" ")[0]).lower()
        phone="07721629"+str(i)
        i=i+1
        md5_hash = hashlib.md5()
        md5_hash.update(password.encode('utf-8'))


        a=Account(first_name=first_name,last_name=last_name,email=email,password=md5_hash.hexdigest(),phone=phone)
        a.save()
    print("Done With Success ")
    return 
def get_data_ticket(request):
    # load_dumy_users(request)
    data_users="<option value=''>Choose A Saller </option>"
    data_events="<option value=''>Choose An Event </option>"
    users=Account.objects.filter(role='Saller')
    events=Event.objects.filter(state="Open")
    

    for rec in users:
        data_users+="<option value='"+str(rec.id)+"'>"+str(rec.first_name)+" "+str(rec.last_name)+" </option> "
    for rec in events:
        data_events+="<option value='"+str(rec.id)+"'>"+str(rec.name)+" </option> "
    
    return JsonResponse({"data_users":data_users,"data_events":data_events})

    