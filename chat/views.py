from django.http import HttpResponse
from django.shortcuts import redirect, render
from channels.db import database_sync_to_async
from .models import Room

# Create your views here.
 
@database_sync_to_async
def index(request):
    rooms = Room.objects.all()
    return render(request, "chat/index.html", {"rooms": rooms})

def add_room(request):
    if request.method == 'POST':
        room_name = request.POST.get('name')
        if not Room.objects.filter(name=room_name).exists():
            Room.objects.create(name=room_name)
    return redirect('chat:index')

def join_room(request, room_name):
    if Room.objects.filter(name=room_name).exists():

        messages = Room.messages.order_by('-timestamp')[:50]

        return render(request, "chat/room.html", {
            "roomname": room_name,
            'message': messages,
        })
    
    else:
        # Room doesn't exist, handle this case (e.g., redirect to an error page)
        return HttpResponse("Room not found", status=404)

def search(request):
    if request.method == 'POST':
        text = request.POST.get('searchBar')
        
        if text:
            rooms = Room.objects.filter(name__icontains=text)

        else:
            rooms = Room.objects.none()
    
    return render(request, "chat/index.html", {"rooms": rooms})