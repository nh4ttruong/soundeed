# Generated by Django 3.2.9 on 2021-12-05 09:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Background',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField(default='Background', max_length=50)),
                ('date', models.DateField(auto_now_add=True)),
                ('thumbnail', models.ImageField(blank=True, default='default.png', upload_to='thumbnail')),
                ('background', models.FileField(default='default.png', upload_to='background')),
                ('category', models.CharField(choices=[('static', 'static'), ('dynamic', 'dynamic')], max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Sound',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField(default='Sound', max_length=50)),
                ('date', models.DateField(auto_now_add=True)),
                ('avatar', models.ImageField(blank=True, default='default.png', upload_to='avatar')),
                ('icon', models.CharField(blank=True, max_length=50, verbose_name='Bootstrap Icon')),
                ('audio', models.FileField(default='default.mp3', upload_to='audio')),
                ('category', models.CharField(choices=[('natural', 'natural'), ('social', 'social')], max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='PlayList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField(default='Playlist', max_length=50)),
                ('playlist', models.CharField(default='Playlist', max_length=100)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
