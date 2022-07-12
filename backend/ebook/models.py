from distutils.command import upload
from email.mime import image
from email.policy import default
from statistics import mode
from tkinter import CASCADE
from turtle import title
from unicodedata import category, name
from xml.parsers.expat import model
from django.db import models
from django.forms import IntegerField
# from django.contrib.auth.models import User
from django.utils import timezone
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from users.models import NewUser


def upload_to(instance, filename):
    return 'posts/{filename}'.format(filename=filename)


def uploadfile_to(instance, filename):
    return 'bookpdf/{filename}'.format(filename=filename)


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Genre(models.TextChoices):
    FANTASY = 'FANTASY'
    SCI_FI = 'SCI-FI'
    MYSTERY = 'MYSTERY'
    HORROR = 'HORROR'
    THRILLER = 'THRILLER'
    POETRY = 'POETRY'
    ADVENTURE = 'ADVENTURE'
    DRAMA = 'DRAMA'
    NONFICTION = 'NONFICTION'
    MEDIA = 'MEDIA'
    ROMANCE = 'ROMANCE'
    WESTERNS = 'WESTERNS'
    ACTION = 'ACTION'
    CONTEMPORARY = 'CONTEMPORARY'


class Post(models.Model):

    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('category', 'Category')
    )

    category = models.ForeignKey(Category, on_delete=models.PROTECT, default=1)
    genre = models.CharField(
        max_length=50, choices=Genre.choices, default=Genre.ACTION, null=True)
    title = models.CharField(max_length=250)
    ISBN = models.CharField(max_length=50, null=True)
    image = models.ImageField(
        _("Image"), upload_to=upload_to, default='posts/default.jpg')
    authorName = models.CharField(max_length=100, null=True)
    aboutAuthor = models.TextField(null=True)
    excerpt = models.TextField(null=True)
    content = models.TextField()
    pdf = models.FileField(_("pdf"), upload_to=uploadfile_to,
                           default='bookpdf/default.pdf')
    slug = models.SlugField(max_length=250, unique_for_date='published')
    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='book_posts'
    )
    status = models.CharField(
        max_length=10, choices=options, default='published'
    )
    objects = models.Manager()  # default Manager
    postobjects = PostObjects()  # custom Manager

    class Meta:
        ordering = ('-published',)

        def __str__(self):
            return self.title


class PostView(models.Model):
    books = models.OneToOneField(Post, on_delete=models.CASCADE)
    view = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.books.title


class TrendingBooks(models.Model):
    books = models.ForeignKey(Post, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)


class Review(models.Model):
    books = models.ForeignKey(Post, on_delete=models.CASCADE)
    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.TextField()

    def __str__(self):
        return f"user={self.customer.username} | has submitted."


class Slider(models.Model):
    name = models.CharField(max_length=200)
    details = models.TextField()
    image = models.ImageField(upload_to='slider')
    url = models.TextField(default='#')
    books = models.ForeignKey(
        Post, on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return self.name


class Favorite(models.Model):
    id = models.AutoField(primary_key=True)
    books = models.ForeignKey(Post, on_delete=models.CASCADE)
    isFavorite = models.BooleanField(default=False)

    def __str__(self):
        return f"Favorite = {self.isFavorite} for book name = {self.books.title}"


class Report(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True
    )
    username = models.CharField(max_length=50)
    authorName = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.username
