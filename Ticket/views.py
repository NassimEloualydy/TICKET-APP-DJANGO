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
import random
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

def submitTicket(request):
     
     if request.session.get('first_name',None) is None:
             return JsonResponse({"type":"warning","message":"Unautorized User !!"})
     id_data=request.POST['id']
     if id_data!=0:
        name=request.POST['name']
        date=request.POST['date']
        availble=request.POST['availble']
        desired_price=request.POST['desired_price']
        status=request.POST['status']
        event=request.POST['event']
        saller=request.POST['saller']
        cost_price=request.POST['cost_price']
        s=Account.objects.filter(pk=saller).first()
        e=Event.objects.filter(pk=event).first()
        if Ticket.objects.filter(name=name,date=date,saller=s,event=e).exclude(pk=id_data).exists():
            return JsonResponse({"message":"The ticket is already exist !!","type":"warning"})
        data=Ticket(name=name,date=date,availble=availble,desired_price=desired_price,status=status,event=e,saller=s,cost_price=cost_price)
        data=Ticket.objects.filter(pk=id_data).first()
        data.name=name
        data.date=date
        data.availble=availble
        data.desired_price=desired_price
        data.status=status
        data.event=e
        data.saller=s
        data.cost_price=cost_price
        data.save()
        return JsonResponse({"message":"Added With Success ","type":"success"})
     if id_data==0:
        name=request.POST['name']
        date=request.POST['date']
        availble=request.POST['availble']
        desired_price=request.POST['desired_price']
        status=request.POST['status']
        event=request.POST['event']
        saller=request.POST['saller']
        cost_price=request.POST['cost_price']
        s=Account.objects.filter(pk=saller).first()
        e=Event.objects.filter(pk=event).first()
        if Ticket.objects.filter(name=name,date=date,saller=s,event=e).exists():
            return JsonResponse({"message":"The ticket is already exist !!","type":"warning"})
        data=Ticket(name=name,date=date,availble=availble,desired_price=desired_price,status=status,event=e,saller=s,cost_price=cost_price)
        data.save()
        return JsonResponse({"message":"Added With Success ","type":"success"})
def get_data_tickets(request):
     if request.session.get('first_name',None) is None:
             return JsonResponse({"type":"warning","message":"Unautorized User !!"})
     name=request.POST['name']
     date=request.POST['date']
     availble=request.POST['availble']
     desired_price=request.POST['desired_price']
     cost_price=request.POST['corst_price']
     status=request.POST['status']
     event=request.POST['event']
     saller=request.POST['saller']
     query="""
      select t.id,t.name,a.id saller_id,e.id as event_id
      ,concat(a1.first_name,' ',a1.last_name) as saller,
      e.name as event,
      TO_CHAR(t.date, 'YYYY-MM-DD') as date ,t.availble,t.desired_price,
      t.cost_price,t.status
      from public."Ticket_ticket" t 
      inner join public."Ticket_ticket" t1 on t1.id=t.id
      inner join public."Ticket_ticket" t2 on t2.id=t.id
      inner join public."Ticket_ticket" t3 on t3.id=t.id
      inner join public."Ticket_ticket" t4 on t4.id=t.id
      inner join public."Ticket_ticket" t5 on t5.id=t.id
      inner join public."Ticket_ticket" t6 on t6.id=t.id
      inner join public.accounts_account a on a.id=t.saller_id
      inner join public.accounts_account a1 on a1.id=t.saller_id
      inner join public."Event_event" e on e.id=t.event_id
      inner join public."Event_event" e1 on e1.id=t.event_id
      where 
      t1.name like %s and 
      cast(t2.date as text) like %s and 
      cast(t3.availble as text) like %s and 
      cast(t4.desired_price as text) like %s and 
      t5.status like %s and 
      cast(t6.cost_price as text) like %s and 
      concat(a1.first_name,' ',a1.last_name) like %s and
      e1.name like %s

""" 
     cursor=connection.cursor()
     cursor.execute(query,
                    (
                         '%'+name+'%',
                         '%'+date+'%',
                         '%'+availble+'%',
                         '%'+desired_price+'%',
                         '%'+status+'%',
                         '%'+cost_price+'%',
                         '%'+saller+'%',
                         '%'+event+'%',
                    )
                    )
     rows = cursor.fetchall()
     
     columns = [col[0] for col in cursor.description]
     data = [dict(zip(columns, row)) for row in rows]
     return JsonResponse({"type":"success","message":data})
def loadDemoDataTicket(request):
     id_data=1
     for i in range(0,100):
          event_id=random.randint(19,212)
          saller_id=random.randint(9,174)
          price=random.randint(100,1074)
          cost_price=random.randint(100,500)
          id_data=id_data+1
          saller=Account.objects.filter(pk=saller_id).first()
          event=Event.objects.filter(pk=event_id).first()
          while not event:
              event_id=random.randint(19,212)
              
              event=Event.objects.filter(pk=event_id).first()
               
          
          if Ticket.objects.filter(name="Ticket "+str(id_data)+" "+event.name,date=event.date,saller=saller,event=event).exists():
            i=i-1
            continue
          data=Ticket(name="Ticket "+str(id_data)+" "+event.name,date=event.date,saller=saller,event=event,availble=True,desired_price=price,status="Open",cost_price=cost_price)
          print("Data Added")

          data.save()

     return JsonResponse({"type":"success","message":"Demo Data Loaded with success !!"})
def deleteTicket(request):
    if request.session.get('first_name',None) is None:
        return JsonResponse({"type":"warning","message":"Unautorized User !!"})
    id_data=request.POST['id']
    data=Ticket.objects.filter(pk=id_data).first()
    print(data)
    data.delete()
    return JsonResponse({"type":"success","message":"Ticket Deleted With Success !!"})
    

def chart_number_of_ticket_by_event(request):
      query="select e.name as name,count(t.id) from public."+'"'+"Ticket_ticket"+'"'+" t inner join public."+'"'+"Event_event"+'"'+" e on e.id=t.event_id group by e.name"
      cursor=connection.cursor()
      cursor.execute(query,())
      rows = cursor.fetchall()
        
      columns = [col[0] for col in cursor.description]
    
      data = [dict(zip(columns, row)) for row in rows]
    #   print(data)
      return JsonResponse({"type":"success","message":data})
def get_data_home(request):
    if request.session.get('first_name',None) is None:
             return JsonResponse({"type":"warning","message":"Unautorized User !!"})
    name=request.POST['name']
    query="""
    select e.id,e.name,e.date,e.time_start,e.time_end,e.nbr_ticket,e.state,s.name as stade,c.name as category
    from public."Event_event" e 
    inner join public.stades_stade s on s.id=e.stade_id
    inner join public.category_category c on c.id=e.category_id
    where e.name like %s or cast(e.date as text) like %s or 
    cast(e.date as text) like %s or cast(e.time_start as text) like %s
    or cast(e.time_end as text) like %s or e.state like %s or s.name like %s or c.name like %s

    
"""
    cursor=connection.cursor()
    cursor.execute(query,
                (
                         '%'+name+'%',
                         '%'+name+'%',
                         '%'+name+'%',
                         '%'+name+'%',
                         '%'+name+'%',
                         '%'+name+'%',
                         '%'+name+'%',
                         '%'+name+'%',

                )
                )
    rows = cursor.fetchall()
    
    columns = [col[0] for col in cursor.description]
    data = [dict(zip(columns, row)) for row in rows]
    data_category=[]

    for rec in data:
        if len(Ticket.objects.filter(event=rec['id']))==0:
             continue
        if len(Ticket.objects.filter(event=rec['id']))>0:
            rec['nbr_ticket']=str(len(Ticket.objects.filter(event=rec['id'])))  
            data_category.append(rec)
         
    return JsonResponse({"type":"success","message":data_category})
def ticketDetail(request,id):
         e=Event.objects.filter(pk=id).first()
         return render(request,"ticketDetail.html",{
              "event":e,
              "stade":e.stade
         })

     