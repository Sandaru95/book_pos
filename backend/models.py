from django.db import models

class Publisher(models.Model):
    name = models.CharField(max_length=30)
    tel = models.CharField(max_length=10)
    address = models.CharField(max_length=150)
    def __str__(self):
        return self.name

class Author(models.Model):
    name = models.CharField(max_length=200)
    tel = models.CharField(max_length=250)

    def __str__(self):
        return self.name

class BookType(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)  
    book_type = models.ForeignKey(BookType, on_delete=models.CASCADE)
    price = models.IntegerField(default=0)
    item_code = models.CharField(max_length=80)
    isbn_no = models.CharField(max_length=80)

    def __str__(self):
        return self.title
    
class Location(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name

class Item(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    qty = models.IntegerField(default=0)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.book.title}:{self.qty}:{self.location.name}"

class Inquiry(models.Model):
    no = models.CharField(max_length=200)
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE, blank=True, null=True)
    content = models.TextField(max_length=50000)
    subtotal = models.IntegerField(default=0)
    discount = models.IntegerField(default=0)
    total = models.IntegerField(default=0)
    def __str__(self):
        return self.no