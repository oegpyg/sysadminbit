from django.db import models

# Create your models here
class Company(models.Model):
    Code = models.CharField(max_length=15, unique=True, null=False)


class Office(models.Model):
    Code = models.CharField(max_length=15, unique=True, null=False)
