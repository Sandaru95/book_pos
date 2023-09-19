from django.shortcuts import render, HttpResponse
from django.views.generic import TemplateView, View
from .models import Book, Author, Publisher, BookType, Location, Item, Inquiry
import json

class BackendView(TemplateView):
    template_name = "backend/backend.html"

    def get_context_data(self, **kwargs):
        context = super(BackendView, self).get_context_data(**kwargs)
        context['locations'] = Location.objects.all()
        return context

class ItemView(TemplateView):
    template_name = "backend/item.html"

    def get_context_data(self, **kwargs):
        context = super(ItemView, self).get_context_data(**kwargs)
        context['items'] = Book.objects.all()
        context['authors'] = Author.objects.all()
        context['publishers'] = Publisher.objects.all()
        context['book_types'] = BookType.objects.all()
        context['inquirys'] = Inquiry.objects.all()
        return context

class ItemSaveView(View):
    def post(self, request):
        author_post = request.POST['author']
        publisher_post = request.POST['publisher']
        book_type_post = request.POST['book_type']
        book = Book()
        book.title = request.POST['title']
        book.author = Author.objects.filter(name=author_post)[0]
        book.publisher = Publisher.objects.filter(name=publisher_post)[0]
        book.book_type = BookType.objects.filter(name=book_type_post)[0]
        book.price = request.POST['price']
        book.item_code = request.POST['item_code']
        book.isbn_no = request.POST['isbn_no']
        book.save()

        # Optionally Add the Item to an Inquiry
        if request.POST['inquiry'] and request.POST['qty']:
            inquiry_post = request.POST['inquiry']
            qty_post = request.POST['qty']
            inquiry_selected = Inquiry.objects.filter(no=inquiry_post)[0]
            new_content = inquiry_selected.content[:-1] + ',{"title": "' + request.POST['title'] + '", "author":"' + author_post + '", "publisher":"' + publisher_post + '", "book_type": "' + book_type_post + '", "price": "' + request.POST['price'] + '", "item_code": "' + request.POST['item_code'] + '", "isbn_no": "' + request.POST['isbn_no'] + '", "qty": "'+ request.POST['qty'] + '"}]'
            inquiry_selected.content = new_content

            # calculating new subtotal and total
            subtotal = 0
            total = 0
            temp_list = json.loads(new_content)
            for i in temp_list:
                subtotal += (int(i['qty']) * int(i['price']))
            total = subtotal * ((100-int(inquiry_selected.discount))/100)
            inquiry_selected.subtotal = subtotal
            inquiry_selected.total = total
            inquiry_selected.save()

            new_item = Item()
            new_item.book = book
            new_item.qty = int(request.POST['qty'])
            new_item.initial_qty = int(qty_post)
            new_item.location = request.user.cashier.location
            new_item.save()

        return HttpResponse('success')

class ItemUpdateView(View):
    def post(self, request):
        book = Book.objects.filter(item_code=request.POST['item_code'])[0]

        author_post = request.POST['author']
        publisher_post = request.POST['publisher']
        book_type_post = request.POST['book_type']

        book.title = request.POST['title']
        book.author = Author.objects.filter(name=author_post)[0]
        book.publisher = Publisher.objects.filter(name=publisher_post)[0]
        book.book_type = BookType.objects.filter(name=book_type_post)[0]
        book.price = request.POST['price']
        book.item_code = request.POST['item_code']
        book.isbn_no = request.POST['isbn_no']
        book.save()
        return HttpResponse('success')
class ItemDeleteView(View):
    def post(self, request):
        book1 = Book.objects.filter(item_code=request.POST['item_code'])
        book1.delete()
        return HttpResponse('success') 

class AuthorView(TemplateView):
    template_name = "backend/author.html"

    def get_context_data(self, **kwargs):
        context = super(AuthorView, self).get_context_data(**kwargs)
        context['authors'] = Author.objects.all()
        return context

class AuthorUpdateView(View):
    def post(self, request):
        author = Author.objects.filter(name=request.POST['name'])[0]

        author.name = request.POST['name']
        author.tel = request.POST['tel']
        author.save()
        return HttpResponse('success')
class AuthorDeleteView(View):
    def post(self, request):
        author1 = Author.objects.filter(name=request.POST['name'])[0]
        author1.delete()
        return HttpResponse('success') 

class AuthorSaveView(View):
    def post(self, request):
        author = Author()
        author.name = request.POST['name']
        author.tel = request.POST['tel']
        author.save()
        return HttpResponse('success')

class PublisherView(TemplateView):
    template_name = "backend/publisher.html"

    def get_context_data(self, **kwargs):
        context = super(PublisherView, self).get_context_data(**kwargs)
        context['publishers'] = Publisher.objects.all()
        return context

class PublisherSaveView(View):
    def post(self, request):
        publisher = Publisher()
        publisher.name = request.POST['name']
        publisher.tel = request.POST['tel']
        publisher.address = request.POST['address']
        publisher.save()
        return HttpResponse('success')

class PublisherUpdateView(View):
    def post(self, request):
        publisher = Publisher.objects.filter(name=request.POST['name'])[0]

        publisher.name = request.POST['name']
        publisher.tel = request.POST['tel']
        publisher.address = request.POST['address']
        publisher.save()
        return HttpResponse('success')

class PublisherDeleteView(View):
    def post(self, request):
        publisher1 = Publisher.objects.filter(name=request.POST['name'])
        publisher1.delete()
        return HttpResponse('success') 

class BookTypeView(TemplateView):
    template_name = "backend/book_type.html"

    def get_context_data(self, **kwargs):
        context = super(BookTypeView, self).get_context_data(**kwargs)
        context['book_types'] = BookType.objects.all()
        return context

class BookTypeUpdateView(View):
    def post(self, request):
        book_type = BookType.objects.filter(name=request.POST['name'])[0]
        book_type.name = request.POST['new_name']
        book_type.save()
        return HttpResponse('success')
class BookTypeDeleteView(View):
    def post(self, request):
        book_type1 = BookType.objects.filter(name=request.POST['name'])[0]
        book_type1.delete()
        return HttpResponse('success') 

class BookTypeSaveView(View):
    def post(self, request):
        book_type = BookType()
        book_type.name = request.POST['name']
        book_type.save()
        return HttpResponse('success')
class LocationView(TemplateView):
    template_name = "backend/location.html"

    def get_context_data(self, **kwargs):
        context = super(LocationView, self).get_context_data(**kwargs)
        context['locations'] = Location.objects.all()
        return context

class LocationSaveView(View):
    def post(self, request):
        location = Location()
        location.name = request.POST['name']
        location.save()
        for book in Book.objects.all():
            item = Item()
            item.book = book
            item.location = location
            item.qty = 0
            item.save()
        return HttpResponse('success')

class SalesReportView(TemplateView):
    template_name = "backend/sales_report.html"

class StockBalanceView(TemplateView):
    template_name = "backend/stock_balance.html"

    def get_context_data(self, **kwargs):
        context = super(StockBalanceView, self).get_context_data(**kwargs)
        context['locations'] = Location.objects.all()
        return context

class StockBalanceViewView(View):
    def get(self, request, pk):
        location = Location.objects.get(pk=pk)
        items = Item.objects.filter(location=location)
        return render(request, 'backend/stock_balance_view.html', {'items': items, 'location': location})

class AddStockView(TemplateView):
    template_name = "backend/add_stock.html"

    def get_context_data(self, **kwargs):
        context = super(AddStockView, self).get_context_data(**kwargs)
        context['books'] = Book.objects.all()
        context['authors'] = Author.objects.all()
        context['publishers'] = Publisher.objects.all()
        context['book_types'] = BookType.objects.all()
        return context
class AddStockSaveView(View):
    def post(self, request):
        items = json.loads(request.POST['items'])
        for item in items:
            print(item)
            location = request.user.cashier.location
            book = Book.objects.get(item_code=item['item_code'])
            match = Item.objects.filter(location=location, book=book)

            if match:
                matched = match[0]
                matched.qty += int(item['qty'])
                matched.initial_qty += int(item['qty']) # THE NEWLY UPDATED LINE AT 9/16/2023
                matched.save()
            else:
                new_item = Item()
                new_item.book = book
                new_item.location = location
                new_item.initial_qty = int(item['qty'])
                new_item.qty = int(item['qty'])
                new_item.save()
        
        # creating an inquiry
        inquiry = Inquiry()
        inquiry.content = request.POST['items']
        inquiry.publisher = Publisher.objects.filter(name=request.POST['publisher'])[0]
        inquiry.no = request.POST['invoice']
        inquiry.total = int(request.POST['total'])
        inquiry.discount = int(request.POST['discount'])
        inquiry.subtotal = int(request.POST['subtotal'])
        inquiry.save()
        return HttpResponse('success')
class SalesReturnView(TemplateView):
    template_name = "backend/sales_return.html"

    def get_context_data(self, **kwargs):
        context = super(SalesReturnView, self).get_context_data(**kwargs)
        context['books'] = Book.objects.all()
        context['authors'] = Author.objects.all()
        context['publishers'] = Publisher.objects.all()
        context['book_types'] = BookType.objects.all()
        return context
class SalesReturnSaveView(View):
    def post(self, request):
        items = json.loads(request.POST['items'])
        for item in items:
            location = request.user.cashier.location
            book = Book.objects.get(item_code=item['item_code'])
            print(Item.objects.filter(location=request.user.cashier.location, book=book))
            match = Item.objects.filter(location=request.user.cashier.location, book=book)[0]
            match.qty -= int(item['qty'])
            match.save()
        inquiry = Inquiry()
        inquiry.content = request.POST['items']
        inquiry.publisher = Publisher.objects.filter(name=request.POST['publisher'])[0]
        inquiry.no = request.POST['invoice']
        inquiry.total = int(request.POST['total'])
        inquiry.discount = int(request.POST['discount'])
        inquiry.subtotal = int(request.POST['subtotal'])
        inquiry.save()
        return HttpResponse('success')

class InvoiceView(TemplateView):
    template_name = "backend/invoice.html"

    def get_context_data(self, **kwargs):
        context = super(InvoiceView, self).get_context_data(**kwargs)
        context['books'] = Book.objects.all()
        context['authors'] = Author.objects.all()
        context['publishers'] = Publisher.objects.all()
        context['book_types'] = BookType.objects.all()
        return context

class InvoiceSaveView(View):
    def post(self, request):
        items = json.loads(request.POST['items'])
        for item in items:
            location = request.user.cashier.location
            book = Book.objects.get(item_code=item['item_code'])
            print(Item.objects.filter(location=request.user.cashier.location, book=book))
            match = Item.objects.filter(location=request.user.cashier.location, book=book)[0]
            match.qty -= int(item['qty'])
            match.save()
        inquiry = Inquiry()
        inquiry.content = request.POST['items']
        inquiry.publisher = Publisher.objects.filter(name=request.POST['publisher'])[0]
        inquiry.no = request.POST['invoice']
        inquiry.total = int(request.POST['total'])
        inquiry.discount = int(request.POST['discount'])
        inquiry.subtotal = int(request.POST['subtotal'])
        inquiry.save()
        return HttpResponse('success')

class InquiryView(TemplateView):
    template_name = "backend/inquiry.html"

    def get_context_data(self, **kwargs):
        context = super(InquiryView, self).get_context_data(**kwargs)
        context['inquirys'] = Inquiry.objects.all()
        return context

class InquiryOpenView(View):
    template_name = "backend/inquiry_open.html"
    def get(self, request, pk):
        return render( request, self.template_name, {'inquiry': Inquiry.objects.get(pk=pk)})