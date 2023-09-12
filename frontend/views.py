from django.shortcuts import render, HttpResponse
from django.views.generic import TemplateView, View
from backend.models import Book, Item, Receipt
from django.utils import timezone
import json
import datetime
from datetime import date

class HomeView(TemplateView):
    template_name = 'frontend/frontend.html'

    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        context['books'] = Book.objects.all()
        return context
    
class UpdateView(View):
    def post(self, request):
        items = json.loads(request.POST['data'])
        for item in items:
            selectedBook = Book.objects.get(isbn_no=int(item['isbn_no']))
            selectedItem = Item.objects.get(book=selectedBook)
            selectedItem.qty = selectedItem.qty - int(item['qty'])
            selectedItem.save()
        # Increase the Receipt No
        new_receipt = Receipt()
        new_receipt.no = request.user.cashier.last_receipt_no
        new_receipt.content = request.POST['data']
        receipt_total = int(request.POST['total'])
        new_receipt.total = receipt_total
        new_receipt.save()
        
        request.user.cashier.last_receipt_no = request.user.cashier.last_receipt_no + 1
        request.user.cashier.save()
        return HttpResponse('success')

class SalesView(View):
    def get(self, request):
        receipt_list = Receipt.objects.filter(timeIssued=datetime.date.today())
        total = 0
        for receipt in receipt_list:
            total += receipt.total
        return render(request, 'frontend/sales.html', {'total':total})
    
class DrawerAddView(View):
    def post(self, request):
        cash_amount = request.POST['cashAmount']
        user_cashier = request.user.cashier
        try:
            user_cashier.cash_balance = user_cashier.cash_balance + int(cash_amount)
            user_cashier.save()
            return HttpResponse(user_cashier.cash_balance)
        except:
            return HttpResponse('failed')
        finally:
            pass

class DrawerOutView(View):
    def post(self, request):
        cash_amount = request.POST['cashAmount']
        user_cashier = request.user.cashier
        try:
            user_cashier.cash_balance = user_cashier.cash_balance - int(cash_amount)
            user_cashier.save()
            return HttpResponse(user_cashier.cash_balance)
        except:
            return HttpResponse('failed')
        finally:
            pass