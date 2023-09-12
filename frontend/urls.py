from django.urls import path
from . import views

app_name = 'frontend'

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('update/', views.UpdateView.as_view(), name='update'),
    path('sales/', views.SalesView.as_view(), name='sales'),
    path('drawerAdd/', views.DrawerAddView.as_view(), name='drawer_add'),
    path('drawerOut/', views.DrawerOutView.as_view(), name='drawer_out'),
]