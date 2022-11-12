from django.shortcuts import render, redirect
from django.views.generic import View, TemplateView
from django.contrib.auth import authenticate, login, logout
class HomeView(TemplateView):
    template_name = 'cashier/home.html'

class LoginView(View):
    def get(self, request):
        return render(request, 'cashier/login.html', {})

    def post(self, request):
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('backend:home')
        else:
            return redirect('cashier:home')

class LogoutView(View):
    def get(self, request):
        logout(request)
        return redirect('/')