# Generated by Django 4.1.3 on 2022-11-12 13:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_delete_cashier'),
        ('cashier', '0002_alter_cashier_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='cashier',
            name='admin',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='cashier',
            name='default_location',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.location'),
        ),
        migrations.AddField(
            model_name='cashier',
            name='last_login',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='cashier',
            name='last_logout',
            field=models.DateTimeField(null=True),
        ),
    ]
