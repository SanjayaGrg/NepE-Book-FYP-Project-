# Generated by Django 4.0.2 on 2022-04-21 13:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ebook', '0008_favorite'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='aboutAuthor',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='authorName',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
