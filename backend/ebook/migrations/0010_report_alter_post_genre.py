# Generated by Django 4.0.2 on 2022-04-22 03:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ebook', '0009_post_aboutauthor_post_authorname'),
    ]

    operations = [
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=50)),
                ('authorName', models.CharField(max_length=200)),
                ('description', models.TextField()),
            ],
        ),
        migrations.AlterField(
            model_name='post',
            name='genre',
            field=models.CharField(choices=[('FANTASY', 'Fantasy'), ('SCI-FI', 'Sci Fi'), ('MYSTERY', 'Mystery'), ('HORROR', 'Horror'), ('THRILLER', 'Thriller'), ('POETRY', 'Poetry'), ('ADVENTURE', 'Adventure'), ('DRAMA', 'Drama'), ('NONFICTION', 'Nonfiction'), ('MEDIA', 'Media'), ('ROMANCE', 'Romance'), ('WESTERNS', 'Westerns'), ('ACTION', 'Action'), ('CONTEMPORARY', 'Contemporary')], default='ACTION', max_length=50, null=True),
        ),
    ]
