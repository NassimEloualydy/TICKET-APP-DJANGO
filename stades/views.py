from django.shortcuts import render
from django.http import JsonResponse
from django.db import connection
from .models import Stade
import requests
from bs4 import BeautifulSoup
import json
# Create your views here.
def stades(request):
        return render(request,"stades.html")
def submitStades(request):
        if request.session.get('first_name',None) is None:
             return JsonResponse({"type":"warning","message":"Unautorized User !!"})
        name=request.POST['name']
        city=request.POST['city']
        country=request.POST['country']
        location=request.POST['location']
        status=request.POST['status']
        number_of_places=request.POST['number_of_places']
        photo=request.FILES['photo']
        id_stade=request.POST["id"]
        if id_stade==False:                
             if Stade.objects.filter(name=name).exists():
                  return JsonResponse({"type":"warning","message":"Please the name is alredy exist !!"})
             if Stade.objects.filter(location=location).exists():
                  return JsonResponse({"type":"warning","message":"Please the location is alredy exist !!"})
             s=Stade(nbr_places=number_of_places,name=name,city=city,country=country,location=location,status=status,photo_location=photo)
             s.save()
             return JsonResponse({"type":"success","message":"Stade Added with success !!"})
        else:
             if Stade.objects.filter(name=name).exclude(id=id_stade).exists():
                  return JsonResponse({"type":"warning","message":"Please the name is alredy exist !!"})
             if Stade.objects.filter(location=location).exclude(id=id_stade).exists():
                  return JsonResponse({"type":"warning","message":"Please the location is alredy exist !!"})
             s=Stade(nbr_places=number_of_places,name=name,city=city,country=country,location=location,status=status,photo_location=photo)
             s=Stade.objects.filter(pk=id_stade).first()
             s.name=name
             s.nbr_places=number_of_places
             s.city=city
             s.country=country
             s.location=location
             s.status=status
             s.photo_location=photo
             s.save()
             return JsonResponse({"type":"success","message":"Stade Updated with success !!"})
              
def get_data_stades(request):
        if request.session.get('first_name',None) is None:
             return JsonResponse({"type":"warning","message":"Unautorized User !!"})
        name=request.POST['name']
        city=request.POST['city']
        location=request.POST['location']
        country=request.POST['country']
        nbr_places=request.POST['nbr_places']
        status=request.POST['status']
        query="""
        select s.id,s.name,s.city,s.country,s.nbr_places,s.location,s.status
        from public.stades_stade s 
        inner join public.stades_stade s1 on s.id=s1.id
        inner join public.stades_stade s2 on s.id=s2.id
        inner join public.stades_stade s3 on s.id=s3.id
        inner join public.stades_stade s4 on s.id=s4.id
        inner join public.stades_stade s5 on s.id=s5.id
        inner join public.stades_stade s6 on s.id=s6.id
        where s1.name like %s and s2.city like %s and s3.country like %s 
        and s4.nbr_places like %s and s5.status like %s and s6.location like %s
        """
        cursor=connection.cursor()
        cursor.execute(query,('%' + name + '%','%' + city + '%'
                       ,'%' + country + '%'
                       ,'%' + nbr_places + '%'
                       ,'%' + status + '%'
                       ,'%' + location + '%'
                       ))
        rows = cursor.fetchall()
        
        columns = [col[0] for col in cursor.description]
    
        data = [dict(zip(columns, row)) for row in rows]

        return JsonResponse({"type":"success","message":data})

        

def loadDemoData(request):
        if request.session.get('first_name',None) is None:
             return JsonResponse({"type":"warning","message":"Unautorized User !!"})
        url="https://fr.wikipedia.org/wiki/Liste_des_plus_grands_stades_du_monde"
     #    url="https://en.wikipedia.org/wiki/List_of_stadiums_by_capacity"
        response=requests.get(url)
        soup=BeautifulSoup(response.text,'html.parser')
        table=soup.find('tbody')
        rows = table.find_all('tr')
        rows.pop(0)
        for rec in rows:
              tds=rec.find_all('td')
              name=tds[0].find('a').text
              city=tds[1].find('a').text
              country=tds[2].find('span').get('data-sort-value')
              if country==None:
                   country=tds[2].find('span').find('span').get('data-sort-value')
                   if tds[2].find('span').find('span').get('data-sort-value')==None:
                         country=tds[2].find('span').find('span').find('a').get('title')
              nbr_places=tds[5].find('span').text
              s=Stade(nbr_places=nbr_places,name=name,city=city,country=country,location="location",status="Open")
              s.save()
        return JsonResponse({"type":"success","message":"Stade Added with success !!"})          #     print(nbr_places)
def deleteStade(request):        
     if request.session.get('first_name',None) is None:
             return JsonResponse({"type":"warning","message":"Unautorized User !!"})
     id=request.POST['id']
     s=Stade.objects.filter(pk=id).first()
     s.delete()
     return JsonResponse({"type":"success","message":"Deleted With Success !!"})
def chart_number_of_staduims_by_city(request):
      query="select s.country as city,count(*) from public.stades_stade s group by s.country;"
      cursor=connection.cursor()
      cursor.execute(query,())
      rows = cursor.fetchall()
        
      columns = [col[0] for col in cursor.description]
    
      data = [dict(zip(columns, row)) for row in rows]
      return JsonResponse({"type":"success","message":data})
def chart_number_of_staduims_by_status(request):
      query="select s.status,count(*) from public.stades_stade s group by s.status;"
      cursor=connection.cursor()
      cursor.execute(query,())
      rows = cursor.fetchall()
        
      columns = [col[0] for col in cursor.description]
    
      data = [dict(zip(columns, row)) for row in rows]
      return JsonResponse({"type":"success","message":data})