# Generated by Django 4.1.3 on 2022-11-13 05:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_remove_item_add_stock_access_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Inquiry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('no', models.CharField(max_length=200)),
                ('content', models.TextField(max_length=50000)),
            ],
        ),
    ]