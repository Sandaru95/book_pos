# Generated by Django 4.1.3 on 2022-11-12 14:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cashier', '0005_rename_default_location_cashier_location'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cashier',
            old_name='admin',
            new_name='backend',
        ),
    ]