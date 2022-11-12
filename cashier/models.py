from django.db import models
from django.contrib.auth.models import User
from backend.models import Location

class Cashier(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    backend = models.BooleanField(default=False)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, null=True)
    last_logout = models.DateTimeField(null=True)

    def __str__(self):
        return self.user.username