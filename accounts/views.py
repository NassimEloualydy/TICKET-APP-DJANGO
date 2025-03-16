from django.shortcuts import render
from .models import Account
from django.http import JsonResponse
import hashlib

# Create your views here.
def logout(request):
    return 
def signIn(request):
    return render(request,"SignIng.html")
def login(request):
    return render(request,"login.html")

def signInUser(request):
    first_name=request.POST['first_name']
    last_name=request.POST['last_name']
    email=request.POST['email']
    password=request.POST['pw']
    phone=request.POST['phone']
    photo=request.FILES['photo']
    if Account.objects.filter(first_name=first_name,last_name=last_name).exists():
        return JsonResponse({"type":"Warning","message":"Please the first name and the last name is already exist !!"})
    if Account.objects.filter(phone=phone).exists():
        return JsonResponse({"type":"Warning","message":"Please the phone is already exist !!"})
    if Account.objects.filter(email=email).exists():
        return JsonResponse({"type":"Warning","message":"Please the Password is already exist !!"})
    md5_hash = hashlib.md5()
    md5_hash.update(password.encode('utf-8'))

    
    a=Account(first_name=first_name,last_name=last_name,email=email,password=md5_hash.hexdigest(),phone=phone,photo=photo)
    a.save()

    return JsonResponse({"type":"Success","message":"Ajouter avec success"})
    
def loginUser(request):
    email=request.POST['email']
    pw=request.POST['pw']
    md5_hash = hashlib.md5()
    md5_hash.update(pw.encode('utf-8'))

    if not Account.objects.filter(email=email,password=md5_hash.hexdigest()).exists():
        return JsonResponse({"type":"warning","message":"The Email Or The password is incorrect !!"})
        
    a=Account.objects.filter(email=email,password=md5_hash.hexdigest()).first()
    a.status="Connected"
    a.save()
    request.session['first_name']=a.first_name
    request.session['last_name']=a.last_name
    request.session['email']=a.email
    request.session['role']=a.role
    request.session['phone']=a.phone
    # request.session['photo']=a.photo
    request.session['status']=a.status
    return JsonResponse({"type":"success","message":"Connected with success !!"})


    
