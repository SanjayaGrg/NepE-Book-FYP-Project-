from django.urls import path
from .views import ChangePasswordView, CustomUserCreate, BlacklistTokenView, ProfileView, user_login

app_name = 'users'

urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenView.as_view(), name="blacklist"),
    path('login/', user_login.as_view(), name="user-login"),
    path('change_password/<int:pk>/', ChangePasswordView.as_view(),
         name='auth_change_password'),
    path('profile/', ProfileView.as_view()),
]
