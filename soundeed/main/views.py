from django.shortcuts import render, redirect
from .forms import NewUserForm
from django.contrib.auth import login, authenticate, logout, update_session_auth_hash
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm, PasswordResetForm, PasswordChangeForm
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.template.loader import render_to_string
from django.db.models.query_utils import Q
from django.contrib.auth.models import User
from django.core.mail import BadHeaderError, send_mail
from .models import Sound, Background, PlayList


# Create your views here.
def index(response):
    if response.method == "POST":
        if response.POST.get("new"):
            txt = response.POST.get("new")
            txtPlayList = response.POST.get("addPlayList")

        new_list = PlayList(user=response.user, title=txt, playlist=txtPlayList)
        new_list.save()
        return redirect("/")

    return render(
        response,
        "pages/index.html",
        {"sound": Sound.objects.all(), "background": Background.objects.all()},
    )


def register_request(request):
    if request.method == "POST":
        form = NewUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "Registration successful.")
            return redirect("/")
        messages.error(request, "Unsuccessful registration. Invalid information.")
    form = NewUserForm()
    return render(request, "user/register.html", context={"register_form": form})


def login_request(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password")
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.info(request, f"You are now logged in as {username}.")
                if user.is_superuser:
                    return redirect("/admin")
                else:
                    return redirect("/")
            else:
                messages.error(request, "Invalid username or password.")
        else:
            messages.error(request, "Invalid username or password.")
    form = AuthenticationForm()
    return render(request, "user/login.html", context={"login_form": form})


def logout_request(request):
    logout(request)
    messages.info(request, f"You have successfully logged out.")
    return redirect("/")


# PASSWORD EMAIL REQUEST
def password_reset_request(request):
    if request.method == "POST":
        password_reset_form = PasswordResetForm(request.POST)
        if password_reset_form.is_valid():
            data = password_reset_form.cleaned_data["email"]
            associated_users = User.objects.filter(Q(email=data))
            if associated_users.exists():
                for user in associated_users:
                    subject = "Password Reset Requested"
                    email_template_name = "user/password_reset_email.txt"
                    c = {
                        "email": user.email,
                        "domain": "127.0.0.1:8000",
                        "site_name": "SOUNDeeD",
                        "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                        "user": user,
                        "token": default_token_generator.make_token(user),
                        "protocol": "http",
                    }
                    email = render_to_string(email_template_name, c)
                    try:
                        send_mail(
                            subject, email, "admin@soundeed.com", [user.email], fail_silently=False
                        )
                    except BadHeaderError:
                        return HttpResponse("Invalid header found.")
                    return redirect("password_reset/done/")
    password_reset_form = PasswordResetForm()
    return render(
        request=request,
        template_name="user/password_reset.html",
        context={"password_reset_form": password_reset_form},
    )


def password_change(request):
    if request.method == "POST":
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # Important!
            messages.success(request, "Your password was successfully updated!")
            return redirect("/")
        else:
            messages.error(request, "Please correct the error below.")
    else:
        form = PasswordChangeForm(request.user)
    return render(request, "user/password_change.html", {"form": form})


def error404(request, exception):
    return render(request, "pages/error.html", {"message": "hello"})


def error500(request):
    return render(request, "pages/error.html")
