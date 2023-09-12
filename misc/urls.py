from django.urls import path
from . import views

app_name = 'misc'

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('invoice/', views.InvoiceView.as_view(), name='invoice'),
    path('invoice/<int:pk>/', views.InvoicePublisherView.as_view(), name='invoice_publisher'),
    path('sales_return/', views.SalesReturnView.as_view(), name='sales_return'),
]