from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from .models import CustomUser, Profile, GoOut, Matching, DirectMessage
from .serializers import UserSerializer, ProfileSerializer, GoOutSerializer, MatchingSerializer, DirectMessageSerializer


class CreateUserView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class UserView(RetrieveUpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return self.queryset.filter(id=self.request.user.id)


class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        response = {'message': 'Delete is not allowed !'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        response = {'message': 'Update DM is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        response = {'message': 'Patch DM is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


class MyProfileListView(RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class GoOutViewSet(ModelViewSet):
    queryset = GoOut.objects.all()
    serializer_class = GoOutSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MatchingViewSet(ModelViewSet):
    queryset = Matching.objects.all()
    serializer_class = MatchingSerializer

    def get_queryset(self):
        return self.queryset.filter(Q(approaching=self.request.user) | Q(approached=self.request.user))

    def perform_create(self, serializer):
        serializer.save(approaching=self.request.user)


class DirectMessageViewSet(ModelViewSet):
    queryset = DirectMessage.objects.all()
    serializer_class = DirectMessageSerializer

    def get_queryset(self):
        return self.queryset.filter(sender=self.request.user)

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

    def destroy(self, request, *args, **kwargs):
        response = {'message': 'Delete DM is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


class InboxListView(ReadOnlyModelViewSet):
    queryset = DirectMessage.objects.all()
    serializer_class = DirectMessageSerializer

    def get_queryset(self):
        return self.queryset.filter(receiver=self.request.user)
