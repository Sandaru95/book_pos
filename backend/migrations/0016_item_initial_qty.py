# Generated by Django 4.2.4 on 2023-09-02 07:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0015_alter_receipt_timeissued'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='initial_qty',
            field=models.IntegerField(null=True),
        ),
    ]
