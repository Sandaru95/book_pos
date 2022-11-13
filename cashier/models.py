from django.db import models
from django.contrib.auth.models import User
from backend.models import Location

class Cashier(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    backend = models.BooleanField(default=False)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, null=True)
    last_logout = models.DateTimeField(null=True)

    invoice_access = models.BooleanField(default=True)
    add_stock_access = models.BooleanField(default=True)
    sales_return_access = models.BooleanField(default=True)
    sales_return_access = models.BooleanField(default=True)
    location_access = models.BooleanField(default=True)
    sales_report_access = models.BooleanField(default=True)
    stock_balance_access = models.BooleanField(default=True)
    inquiry_access = models.BooleanField(default=True)

    def __str__(self):
        return self.user.username