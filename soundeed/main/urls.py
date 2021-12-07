from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path("register/", views.register_request, name="register"),
    path("login/", views.login_request, name="login"),
    path("logout/", views.logout_request, name= "logout"),
    path("password_reset/", views.password_reset_request, name="password_reset"),
    path("iwannaseeerror/", views.error404, name="error404"),
    path("password_change/", views.password_change, name="password_change")
]