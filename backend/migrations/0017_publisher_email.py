# Generated by Django 4.2.4 on 2023-09-02 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0016_item_initial_qty'),
    ]

    operations = [
        migrations.AddField(
            model_name='publisher',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
    ]
