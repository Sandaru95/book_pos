from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.RedirectToLoginView.as_view()),
    path('backend/', include('backend.urls')),
    path('cashier/', include('cashier.urls')),
    path('frontend/', include('frontend.urls')),
    path('misc/', include('misc.urls')),
]
