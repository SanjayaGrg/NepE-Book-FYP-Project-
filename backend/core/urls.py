from django.contrib import admin
from django.urls import path, include
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Oauth
    path('auth/', include('drf_social_oauth2.urls', namespace='drf')),
    # Main URLs
    path('admin/', admin.site.urls),
    path('', include('ebook.urls', namespace='ebook')),
    # Ebook API url
    path('api/', include('ebook_api.urls', namespace='ebook_api')),
    # Stripe account
    path('api/stripe/', include('payments.urls', namespace='stripe')),

    # user management
    path('api/user/', include('users.urls', namespace='users')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # API Token management
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # API schema and documentation
    path('project/docs/', include_docs_urls(title="EBookAPI")),
    path('schema', get_schema_view(
        title="EBookAPI",
        description="API for the EBookAPI",
        version="1.0.0"
    ), name="openapi-schema"),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
