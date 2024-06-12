from django.urls import path
from chat import views

app_name = 'chat'

urlpatterns = [
    path("", views.index, name="index"),
    path("join/<str:room_name>/", views.join_room, name="room"),
    path("add/", views.add_room, name="add"),
    path("search/", views.search, name="search"),
]