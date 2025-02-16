from django.shortcuts import render
from .models import  Category
from django.http import JsonResponse
from django.db import connection

# Create your views here.
def category(request):
    return render(request,"category.html")
def submitCategory(request):
    name=request.POST['name']
    parent=request.POST['parent']
    if Category.objects.filter(name=name).exists():
        return JsonResponse({"type":"warning","message":"Please this category is already exist !!"})
    p=Category.objects.filter(id=parent).first()
    c=Category(name=name,parent_category=p)
    c.save()
    return JsonResponse({"type":"success","message":"Category Added With Success !!"})
def getParentCategory(request):
        if request.session.get('first_name',None) is None:
             return JsonResponse({"type":"warning","message":"Unautorized User !!"})
        cursor=connection.cursor()
        query="select id,name from public.category_category order by id desc"
        cursor.execute(query)
        rows = cursor.fetchall()
        columns = [col[0] for col in cursor.description]
        
        category_objects = [dict(zip(columns, row)) for row in rows]
        print(category_objects)
        return JsonResponse({"type":"success","message":category_objects})
def get_data(request):
    if request.session.get('first_name',None) is None:
             return JsonResponse({"type":"warning","message":"Unautorized User !!"})
    
    name=request.POST['name']
    parent=request.POST['parent']
    query="""
    select c.id,c.name,p.name as parent  from public.category_category c inner join public.category_category p on p.id=c.parent_category_id
    inner join public.category_category c1 on c1.id=c.id
    inner join public.category_category c2 on c2.id=p.id
    where c1.name like %s and c2.name like %s
    """
    cursor=connection.cursor()
    cursor.execute(query, ('%' + name + '%','%' + parent + '%',))
    rows = cursor.fetchall()
    columns = [col[0] for col in cursor.description]
    
    category_objects = [dict(zip(columns, row)) for row in rows]
    return JsonResponse({"type":"success","message":category_objects})


