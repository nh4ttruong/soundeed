from django.contrib import admin
from .models import Sound, Background, PlayList
# Register your models here.

class soundAdmin(admin.ModelAdmin):
    list_display = ['title', 'date', 'category']
    list_filters = ['date']
    search_fields = ['id']
    pass

class backgroundAdmin(admin.ModelAdmin):
    list_display = ['title', 'date', 'category']
    list_filters = ['date']
    search_fields = ['id']
    pass

class playlistAdmin(admin.ModelAdmin):
    list_display = ['title', 'user']
    pass 

admin.site.register(Sound, soundAdmin)
admin.site.register(Background, backgroundAdmin)
admin.site.register(PlayList, playlistAdmin)