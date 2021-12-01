from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE


# Create your models here.
class Sound(models.Model):
    title = models.TextField(max_length=50, default="Sound")
    date = models.DateField(auto_now=False, auto_now_add=True)
    avatar = models.ImageField(upload_to='avatar', default='default.png', blank=True)
    icon = models.CharField("Bootstrap Icon", max_length=50, blank=True)
    audio = models.FileField(upload_to='audio', default='default.mp3')
    natural = "natural"
    social = "social"
    category = models.CharField(
        max_length=50,
        choices = (
            (natural, natural),
            (social, social)
        )
    )
    
    def __str__(self):
        return self.title
    
class Background(models.Model):
    title = models.TextField(max_length=50, default="Background")
    date = models.DateField(auto_now=False, auto_now_add=True)
    thumbnail = models.ImageField(upload_to='thumbnail', default='default.png', blank=True)
    background = models.FileField(upload_to='background', default='default.png')
    static = "static"
    dynamic = "dynamic"
    category = models.CharField(
        max_length=50,
        choices = (
            (static, static),
            (dynamic, dynamic)
        )
    )
    
    def __str__(self):
        return str(self.background)

class PlayList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.TextField(max_length=50, default="Playlist")
    playlist = models.CharField(max_length=100, default="Playlist")

    def __str__(self):
        return str(self.title)