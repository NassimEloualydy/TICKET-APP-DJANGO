from django.shortcuts import render
from django.http import JsonResponse
from .models import Event
from stades.models import Stade
from category.models import Category
from django.db import connection
import requests
from bs4 import BeautifulSoup
import json
# Create your views here.
def events(request):
    return render(request,"event.html")
def get_data_events(request):
    if request.session.get("first_name",None) is None:
             return JsonResponse({"type":"warning","message":"Unautorized User !!"})
    name=request.POST['name']
    date=request.POST['date']
    start=request.POST['start']
    End=request.POST['End']
    nbr_ticket=request.POST['nbr_ticket']
    state=request.POST['state']
    stade=request.POST['stade']
    category=request.POST['category']
    query="""
    select e.id,e.name,e.date,e.time_start,e.time_end,e.nbr_ticket,e.state,s.name as stade,c.name as category
    from public."Event_event" e 
    inner join public."Event_event" e1 on e1.id=e.id
    inner join public."Event_event" e2 on e2.id=e.id
    inner join public."Event_event" e3 on e3.id=e.id
    inner join public."Event_event" e4 on e4.id=e.id
    inner join public."Event_event" e5 on e5.id=e.id
    inner join public."Event_event" e6 on e6.id=e.id
    inner join public.stades_stade s on s.id=e.stade_id
    inner join public.category_category c on c.id=e.category_id
    where e1.name like %s and cast(e2.date as text) like %s
    and cast(e3.time_start as text) like %s and cast(e4.time_end as text) like %s
    and e5.nbr_ticket like %s and e6.state like %s and s.name like %s and c.name like %s
    """
    cursor=connection.cursor()
    cursor.execute(query,('%' + name + '%','%' + date + '%'
                       ,'%' + start + '%'
                       ,'%' + End + '%'
                       ,'%' + nbr_ticket + '%'
                       ,'%' + state + '%'
                       ,'%' + stade + '%'
                       ,'%' + category + '%'
                       ))
    rows = cursor.fetchall()

    columns = [col[0] for col in cursor.description]

    data = [dict(zip(columns, row)) for row in rows]

    stades=Stade.objects.filter(status__in=['Open','Partial'])
    data_satded="<option value=''>Choose A Stade</option>"
    for rec in stades:
         data_satded+="<option value='"+str(rec.id)+"'>"+str(rec.name)+"</option>"
          
    categories=Category.objects.filter()
    data_Categories="<option value=''>Choose A Category</option>"
    for rec in categories:
         data_Categories+="<option value='"+str(rec.id)+"'>"+str(rec.name)+"</option>"
    return JsonResponse({"type":"success","data_Categories":data_Categories,"data_satded":data_satded,"data":data})
        
def submitEvent(request):
     
     if request.session.get('first_name',None) is None:
             return JsonResponse({"type":"warning","message":"Unautorized User !!"})
     name=request.POST['name']
     date=request.POST['date']
     idEvent=request.POST["id"]

     start=request.POST['start']
     end=request.POST['end']
     nbr_ticket=request.POST['nbr_ticket']
     status=request.POST['status']
     stade=request.POST['stade']
     category=request.POST['category']
     if idEvent!=False:
         if Event.objects.filter(name=name).exclude(pk=idEvent).exists():
               return JsonResponse({"type":"warning","message":"Please the name is laready exist !!"})
         e=Event.objects.filter(pk=idEvent).first()
         e.name=name
         e.date=date
         e.time_start=start
         e.time_end=end
         e.nbr_ticket=nbr_ticket
         e.state=status
         e.stade=Stade.objects.filter(pk=stade).first()
         e.category=Category.objects.filter(pk=category).first()
         e.save()
         return JsonResponse({"type":"success","message":"Event Updated with success !!"})

     else:
         if Event.objects.filter(name=name).exists():
               return JsonResponse({"type":"warning","message":"Please the name is laready exist !!"})
         e=Event(name=name,date=date,time_start=start,time_end=end,nbr_ticket=nbr_ticket,state=status,stade=Stade.objects.filter(pk=stade).first(),category=Category.objects.filter(pk=category).first())
         e.save()
         return JsonResponse({"type":"success","message":"Event Added with success !!"})
               
def loadDemoData(request):

    if request.session.get('first_name',None) is None:
      return JsonResponse({"type":"warning","message":"Unautorized User !!"})
    url="https://www.fanpass.net/all-sport-events-tickets"
    for i in range(1,20):
        url_post="https://www.fanpass.net/all-sport-events-tickets.json?&page="+str(i)+""
        response=requests.get(url)
        soup=BeautifulSoup(response.text,'html.parser')
        token=soup.find_all('input', id='fanpass_sportevent_filters_public__token')[0].get('value')
        session = requests.Session()
        response=session.post(url_post, data={
                 'fanpass_sportevent_filters_public[sport]':'',
                 'fanpass_sportevent_filters_public[competition]':'',
                 'team-holder':'',
                 'fanpass_sportevent_filters_public[team]':'',
                 'fanpass_sportevent_filters_public[venue]':'',
                 'fanpass_sportevent_filters_public[date]':'',
                 'fanpass_sportevent_filters_public[date_filters]':0,
                 'fanpass_sportevent_filters_public[_token]':token,
            })
        data=json.loads(response.text)
        ids=[]
        for rec in data['datas']:
         name=rec['name']
         date=str(rec['date']).split('T')[0]
         time_end=str(rec['date']).split('T')[1].split(':')[0]+":"+str(rec['date']).split('T')[1].split(':')[1]
         time_start=str(rec['uk_timezone_flatted_date']).split('T')[1].split(':')[0]+":"+str(rec['uk_timezone_flatted_date']).split('T')[1].split(':')[1]
         nbr_ticket=100 if rec['has_available_tickets']==True else 0
         state="Open"
         stade=rec['venue']['name']
         # the creation of the stade
        #  print(rec['venue'])

         if not Stade.objects.filter(name=rec['venue']['name']).exists():
              print("test")
              s=Stade(name=rec['venue']['name'],city=rec['venue']['town'],country=rec['venue']['country'],location=rec['venue']['postal_code'] if 'postal_code' in rec['venue'] else '',status='Open',nbr_places='1000')
              s.save()
         stade=Stade.objects.filter(name=rec['venue']['name']).first()
         
         if not Category.objects.filter(name=rec['team_one']['competitions'][0]['name']).first():
              print("test")
              c=Category(name=rec['team_one']['competitions'][0]['name'],display_name=rec['team_one']['competitions'][0]['name'])
              c.save()
         c=Category.objects.filter(name=rec['team_one']['competitions'][0]['name']).first()             
         if Event.objects.filter(name=name,date=date,time_start=time_start,time_end=time_end,stade=stade,category=c).exists():
              continue
         e=Event(name=name,date=date,time_start=time_start,time_end=time_end,nbr_ticket=nbr_ticket,state=state,stade=stade,category=c)
         e.save()
    return JsonResponse({"type":"success","message":"Event Added with success !!"})
def deleteEvent(request):
         if request.session.get("first_name",None) is None:
                    return JsonResponse({"type":"warning","message":"Unautorized User !!"})
         id=request.POST['id']
         e=Event.objects.filter(pk=id).first()
         e.delete()
         return JsonResponse({"type":"success","message":"Event Deleted with success !!"})
    # col_sm_9=soup.find('')
def chart_number_of_event_by_stade(request):
      query="select s1.name as name,count(s.id) from public."+'"'+"Event_event"+'"'+" s inner join public.stades_stade s1 on s1.id=s.stade_id group by s1.name"
      cursor=connection.cursor()
      cursor.execute(query,())
      rows = cursor.fetchall()
        
      columns = [col[0] for col in cursor.description]
    
      data = [dict(zip(columns, row)) for row in rows]
      return JsonResponse({"type":"success","message":data})