from django.contrib import admin
from .models import Room

# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    display = 'name'
    
admin.site.register(Room, ProductAdmin)