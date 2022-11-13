from django.shortcuts import render
from django.views.generic import TemplateView
from backend.models import Book

class HomeView(TemplateView):
    template_name = 'frontend/frontend.html'

    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        context['books'] = Book.objects.all()
        return context