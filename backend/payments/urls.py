from django.urls import path
from .views import StripeCheckoutView

app_name = 'payments'

urlpatterns = [
    path('create-checkout-session/', StripeCheckoutView.as_view()),
]
