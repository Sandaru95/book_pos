from django.shortcuts import render
from django.views.generic import TemplateView

class BackendView(TemplateView):
    template_name = "backend/backend.html"

class ItemView(TemplateView):
    template_name = "backend/ex.html"

class AuthorView(TemplateView):
    template_name = "backend/ex.html"

class PublisherView(TemplateView):
    template_name = "backend/ex.html"

class BookTypeView(TemplateView):
    template_name = "backend/ex.html"

class LocationView(TemplateView):
    template_name = "backend/ex.html"

class CashierView(TemplateView):
    template_name = "backend/ex.html"

class SalesReportView(TemplateView):
    template_name = "backend/ex.html"

class StockBalanceView(TemplateView):
    template_name = "backend/ex.html"

class AddStockView(TemplateView):
    template_name = "backend/ex.html"

class LocationTransferView(TemplateView):
    template_name = "backend/ex.html"

class InvoiceView(TemplateView):
    template_name = "backend/ex.html"

class InquiryView(TemplateView):
    template_name = "backend/ex.html"