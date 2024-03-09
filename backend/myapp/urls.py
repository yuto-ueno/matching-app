from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (CreateUserView,
                    UserView,
                    ProfileViewSet,
                    MyProfileListView,
                    OtherProfileViewSet,
                    GoOutViewSet,
                    MatchingViewSet,
                    DirectMessageViewSet,
                    InboxListView)

app_name = 'myapp'

router = DefaultRouter()
router.register('profiles', ProfileViewSet)
router.register('others', OtherProfileViewSet)
router.register('goout', GoOutViewSet)
router.register('favorite', MatchingViewSet)
router.register('dm-message', DirectMessageViewSet)
router.register('dm-inbox', InboxListView)

urlpatterns = [
    path('users/create', CreateUserView.as_view(), name='users-create'),
    path('users/<pk>', UserView.as_view(), name='users'),
    path('users/profile/<pk>', MyProfileListView.as_view(), name='users-profile'),
    path('', include(router.urls)),
]
