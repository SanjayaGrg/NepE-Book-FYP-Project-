from audioop import reverse
from curses.ascii import US
from http import client
from logging import root
from multiprocessing.connection import Client
from turtle import title
from unicodedata import category, name
from urllib import response
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase
from ebook.models import Post, Category
from django.contrib.auth.models import User
from rest_framework.test import APIClient


class PostTests(APITestCase):

    def test_view_posts(self):

        url = reverse('ebook_api:listcreate')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_post(self):

        self.test_category = Category.objects.create(name='django')

        self.testuser1 = User.objects.create_superuser(
            username='test_user1', password='123456789'
        )

        self.client.login(username=self.testuser1.username,
                          password='123456789')

        data = {"title": "new", "author": 1,
                "excerpt": "new", "content": "new"}
        url = reverse('ebook_api:listcreate')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # root = reverse(('ebook_api:detailcreate'), kwargs={'pk': 1})
        # response = self.client.get(url, format='json')
        # self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_update(self):

        client = APIClient()

        self.test_category = Category.objects.create(name='django')
        self.testuser1 = User.objects.create_user(
            username='test_user1', password='123456789'
        )
        self.testuser2 = User.objects.create_user(
            username='test_user2', password='123456789'
        )
        test_post = Post.objects.create(
            category_id=1, title='Post Title', excerpt='Post Excerpt', content='Post Content', slug='post-title', author_id=1, status='published'
        )

        client.login(username=self.testuser1.username,
                     password='123456789')

        url = reverse(('ebook_api:detailcreate'), kwargs={'pk': 1})

        response = client.put(
            url, {
                "id": 1,
                "title": "",
                "author": 1,
                "excerpt": "",
                "Content": "",
                "status": "published"
            }, format='json'
        )
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
