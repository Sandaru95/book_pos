from django.contrib import admin
from .models import Author, Publisher, Book, BookType, Location, Item, Inquiry


admin.site.register(Author)
admin.site.register(Publisher)
admin.site.register(Book)
admin.site.register(BookType)
admin.site.register(Location)
admin.site.register(Item)
admin.site.register(Inquiry)