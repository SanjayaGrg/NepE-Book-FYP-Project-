from email.policy import default
import mimetypes
from multiprocessing import context
import os
from turtle import title
from urllib import response
from django.conf import settings
from django.http import Http404, HttpResponse
from requests import post
from rest_framework import generics, viewsets
from stripe import Customer
from ebook.models import Favorite, Post, PostView, Report, Review, Slider, TrendingBooks
from .serializers import BookViewSerializer, PostSerializer, ReportSerializer, ReviewSerializer, SinglePostSerializer, SliderSerializer, TrendingBooksSerializer
from rest_framework.permissions import SAFE_METHODS, AllowAny, BasePermission, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser, DjangoModelPermissions
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import filters, permissions
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from core.settings import BASE_DIR, MEDIA_ROOT
from rest_framework.decorators import api_view
from django.core.files import File

# creating a custom permission##########################33


# class PostUserWritePermission(BasePermission):
#     message = 'Editing the books is restricted to publisher of the book only.'

#     def has_object_permission(self, request, view, obj):

#         if request.method in SAFE_METHODS:
#             return True

#         return obj.author == request.user


# class PostList(viewsets.ModelViewSet):
#     permission_classes = [PostUserWritePermission]
#     serializer_class = PostSerializer
#     # queryset = Post.postobjects.all()

#     def get_object(self, queryset=None, **kwargs):
#         item = self.kwargs.get('pk')
#         return get_object_or_404(Post, slug=item)

#     # defining custom query set
#     def get_queryset(self):
#         return Post.objects.all()


#####################################################################
# DISPLAYING POST
class PostList(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    # def get_queryset(self):
    #     user = self.request.user
    #     return Post.objects.filter(author=user)


class PostDetail(generics.RetrieveAPIView):

    serializer_class = PostSerializer

    def get_queryset(self):
        slug = self.request.query_params.get('slug', None)
        print(slug)
        return Post.objects.filter(slug=slug)

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Post, slug=item)


class PostListDetailfilter(generics.ListAPIView):

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^slug']


class PostSearch(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^slug']


# class PostSearch(generics.ListAPIView):
#     permission_classes = [AllowAny]
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer
#     filter_backends = [filters.SearchFilter]
#     search_fields = ['^slug']

    # def get_object(self, queryset=None, **kwargs):
    #     item = self.kwargs.get('pk')
    #     return get_object_or_404(Post, slug=item)

    # Define Custom Queryset
    # def get_queryset(self):
    #     return Post.objects.all()


#############    POST ADMIN  ###################
# class CreatePost(generics.CreateAPIView):
#     permission_classes = [permissions.IsAuthenticated]
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer


class CreatePost(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        print(request.data)
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# def download_file(request):
#     # Define Django project base directory
#     BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
#     filename = 'test.pdf'
#     # Define the full file path
#     filepath = BASE_DIR + '/bookpdf/' + \
#         filename(default)
#     # Open the file for reading content
#     path = open(filepath, 'r')
#     # Set the mime type
#     mime_type, _ = mimetypes.guess_type(filepath)
#     # Set the return value of the HttpResponse
#     response = HttpResponse(path, content_type=mime_type)
#     # Set the HTTP header for sending to browser
#     response['Content-Disposition'] = "attachment; filename=%s" % filename
#     # Return the response value
#     return response


# def download(request, path):
#     file_path = os.path.join(settings.MEDIA_ROOT, path)
#     if os.path.exists(file_path):
#         with open(file_path, 'rb')as fh:
#             response = HttpResponse(
#                 fh.read(), content_type="application/adminupload")
#             response['content-Disposition'] = 'inline;filename=' + \
#                 os.path.basename(file_path)
#             return response

#     raise Http404


# @api_view(['GET'])
# def DownloadPDF(self):
#     path_to_file = MEDIA_ROOT + '/bookpdf/filename.pdf'
#     f = open(path_to_file, 'rb')
#     pdfFile = File(f)
#     response = HttpResponse(pdfFile.read())
#     response['Content-Disposition'] = 'attachment'
#     return response


class AdminPostDetail(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class EditPost(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class DeletePost(generics.RetrieveDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer
    queryset = Post.objects.all()


# models
class TrendingBooksView(APIView):
    def get(self, request):
        queryset = TrendingBooks.objects.all()
        serializer_class = TrendingBooksSerializer(
            queryset, many=True, context={'request': request}).data
        return Response(serializer_class)


class SliderView(APIView):
    def get(self, request):
        slider_obj = Slider.objects.all()
        serializer_class = SliderSerializer(
            slider_obj, many=True, context={'request': request}).data
        return Response(serializer_class)


class SinglePostView(APIView):
    def get(self, request, pk):
        queryset = Post.objects.filter(id=pk)
        data = []
        serializer_class = SinglePostSerializer(
            queryset, many=True, context={'request': request}).data
        for pos in serializer_class:
            post_view = PostView.objects.filter(books=pos['id']).first()
            print("post_view", post_view)
            if post_view:
                pos['view'] = post_view.view
            else:
                pos['view'] = 0
            post_review = Review.objects.filter(books=pos['id'])
            post_review_serializer = ReviewSerializer(
                post_review, many=True).data
            pos['review'] = post_review_serializer
            data.append(pos)
        return Response(data)


class AddReview(APIView):
    permission_classes = [permissions.AllowAny]

    def post(sef, request, format=None):
        print(request.data)
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ViewReview(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
# class AddReview(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         try:
#             f_user = request.user
#             data = request.data

#             book_id = data["bookid"]
#             review_title = data["title"]
#             book_obj = Post.objects.get(id=book_id)
#             book_obj.save()
#             Review.objects.create(
#                 customer=f_user,
#                 book=book_obj,
#                 title=review_title,
#             )
#             return Response({"error": False, "message": "Review was submitted."})
#         except:
#             return Response({"error": True, "message": "Review was not submitted."})


class AddViewBook(APIView):
    def post(self, request):
        book_id = request.data['id']
        book_obj = Post.objects.get(id=book_id)
        book_view_obj = PostView.objects.filter(books=book_obj).first()
        if book_view_obj:
            book_view_obj.view += 1
            book_view_obj.save()
        else:
            PostView.objects.create(books=book_obj, view=1)
        return Response({'error': False, 'message': 'Success'})


class MostViewBooks(APIView):
    def get(self, request):
        book_obj = PostView.objects.all().order_by('-view')[:12]
        book_obj_serializer = BookViewSerializer(
            book_obj, many=True, context={'request': request}).data
        return Response(book_obj_serializer)


class favoriteView(APIView):
    # permissions_class = [AllowAny]

    def post(self, request):
        data = request.data["id"]
        try:
            book_obj = Post.objects.get(id=data)
            print(data)
            single_favorite_book = Favorite.objects.filter(
                books=book_obj).first()
            if single_favorite_book:
                print('single_favorite_book')
                a = single_favorite_book.isFavorite
                single_favorite_book.isFavorite = not a
                single_favorite_book.save()

            else:
                Favorite.objects.create(
                    books=book_obj, isFavorite=True
                )
            response_msg = {'message': False}
        except:
            response_msg = {'message': True}
        return Response(response_msg)


# class CreateReport(generics.ListCreateAPIView):
#     # permission_classes = [permissions.IsAuthenticated]
#     queryset = Report.objects.all()
#     serializer_class = ReportSerializer

class CreateReport(APIView):
    permission_classes = [permissions.AllowAny]

    def post(sef, request, format=None):
        print(request.data)
        serializer = ReportSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
