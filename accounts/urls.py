from django.contrib import admin
from django.urls import path,include
from . import views
urlpatterns = [
    path('',views.signIn,name="signIn"),   
    path('signInUser',views.signInUser,name="signInUser"),
    path('login',views.login,name="login"),
    path('loginUser',views.loginUser,name="loginUser"),
    path('logout',views.logout,name="logout")
]