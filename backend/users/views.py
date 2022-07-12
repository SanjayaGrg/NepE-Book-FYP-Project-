from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import NewUser
from .serializers import ChangePasswordSerializer, ProfileSerializer, RegisterUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.decorators import login_required


class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        reg_serializer = RegisterUserSerializer(data=request.data)
        if reg_serializer.is_valid():
            newuser = reg_serializer.save()
            if newuser:
                json = reg_serializer.data
                return Response(status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlacklistTokenView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class user_login(TokenObtainPairView):
    permission_classes = [AllowAny]


# @login_required
class ChangePasswordView(generics.UpdateAPIView):

    queryset = NewUser.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ChangePasswordSerializer


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_obj = NewUser.objects.get(username=request.user)
        user_ser = ProfileSerializer(user_obj).data
        return Response(user_ser)
