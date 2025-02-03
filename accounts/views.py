from django.shortcuts import render
from .models import Account
from django.http import JsonResponse
import hashlib
# Create your views here.
def signIn(request):
    return render(request,"SignIng.html")
def signInUser(request):
    first_name=request.POST['first_name']
    last_name=request.POST['last_name']
    email=request.POST['email']
    password=request.POST['pw']
    phone=request.POST['phone']
    photo=request.FILES['photo']
    if Account.objects.filter(first_name=first_name,last_name=last_name).exists():
        return JsonResponse({"type":"warning","message":"Please the first name and the last name is already exist !!"})
    if Account.objects.filter(phone=phone).exists():
        return JsonResponse({"type":"warning","message":"Please the phone is already exist !!"})
    if Account.objects.filter(email=email).exists():
        return JsonResponse({"type":"warning","message":"Please the Password is already exist !!"})
    md5_hash = hashlib.md5()
    md5_hash.update(password.encode('utf-8'))

    
    a=Account(first_name=first_name,last_name=last_name,email=email,password=md5_hash.hexdigest(),phone=phone,photo=photo)
    a.save()

    return JsonResponse({"type":"success","message":"Ajouter avec success"})
    