from dataclasses import fields
from email.mime import image
from pyexpat import model
from rest_framework import serializers
from ebook.models import Post, PostView, Report, Review, Slider, TrendingBooks
from django.conf import settings


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('category', 'genre', 'id', 'title', 'ISBN', 'image', 'pdf', 'slug', 'author', 'authorName', 'aboutAuthor',
                  'excerpt', 'content', 'status')


class UserRegisterSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ('email', 'username', 'first_name')
        extra_kwargs = {'password': {'write_only': True}}


class TrendingBooksSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrendingBooks
        fields = "__all__"
        depth = 1


class SliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slider
        fields = "__all__"

    def getimage(self, *args, **kwargs):
        request = self.context.get('request')
        return request.url(image)


class SinglePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"
        depth = 1

    def imageurl(self, obj):
        request = self.context.get('request')
        return request.url(image)


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"
        depth = 1


class BookViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostView
        fields = "__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        request = self.context.get('request')
        response['books'] = PostSerializer(
            instance.books, context={'request': request}
        ).data
        return response


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = "__all__"
        depth = 1
