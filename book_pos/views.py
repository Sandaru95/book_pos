from django.views.generic import View
from django.shortcuts import redirect

class RedirectToLoginView(View):
    def get(self, request):
        return redirect('cashier:home')