from typing import Any, Dict
from django.shortcuts import render
from django.views.generic import TemplateView, View, ListView, DetailView
from backend.models import Publisher, Item

class HomeView(TemplateView):
    template_name = 'misc/home.html'

class InvoiceView(ListView):
    model = Publisher
    template_name = 'misc/invoice.html'

class InvoicePublisherView(DetailView):
    model = Publisher
    template_name = 'misc/invoice_publisher.html'

    def get_context_data(self, **kwargs):
        context = super(InvoicePublisherView, self).get_context_data(**kwargs)

        selected_publisher = Publisher.objects.get(pk=self.kwargs['pk'])
        item_list = Item.objects.filter(book__publisher=selected_publisher, location=self.request.user.cashier.location)
        context['item_list'] = item_list
        return context

class SalesReturnView(ListView):
    model = Publisher
    template_name = 'misc/sales_return.html'

class StockSearchView(View):
    def get(self, request):
        context = {}
        context['items'] = Item.objects.all()
        return render(request, "misc/stock_search.html", context)