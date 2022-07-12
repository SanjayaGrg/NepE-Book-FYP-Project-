from .views import AddReview, AddViewBook, CreateReport, MostViewBooks, PostList, EditPost, DeletePost, AdminPostDetail, CreatePost, PostDetail, SinglePostView, SliderView, TrendingBooksView, PostListDetailfilter, ViewReview, favoriteView
from django.urls import path
# from rest_framework.routers import DefaultRouter

app_name = 'ebook_api'

# router = DefaultRouter()
# router.register('', PostList, basename='post')
# urlpatterns = router.urls

urlpatterns = [
    path('', PostList.as_view(), name='listpost'),
    path('post/<str:pk>/', PostDetail.as_view(), name='detailpost'),

    path('search/', PostListDetailfilter.as_view(), name='postsearch'),

    # author URLs
    path('admin/create/', CreatePost.as_view(), name='createpost'),
    path('admin/edit/postdetail/<int:pk>/',
         AdminPostDetail.as_view(), name='admindetailpost'),
    path('admin/edit/<int:pk>/', EditPost.as_view(), name='editpost'),
    path('admin/delete/<int:pk>/', DeletePost.as_view(), name='deletepost'),

    path('trendingbooks/', TrendingBooksView.as_view()),
    path('sliders/', SliderView.as_view()),
    path('singlepost/<int:pk>/', SinglePostView.as_view()),
    path('addbookview/', AddViewBook.as_view()),
    path('mostviewbooks/', MostViewBooks.as_view()),
    path('addreview/', AddReview.as_view()),
    path('viewreview/', ViewReview.as_view()),
    path('favoritebooks/', favoriteView.as_view()),
    path('createreport/', CreateReport.as_view()),
]
