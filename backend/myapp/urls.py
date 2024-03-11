from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (CreateUserView,
                    UserView,
                    ProfileViewSet,
                    MyProfileView,
                    OtherProfileViewSet,
                    MyGoOutViewSet,
                    MyGoOutEditView,
                    TrueGoOutUserViewSet,
                    MatchingViewSet,
                    MyApproachingViewSet,
                    DirectMessageViewSet,
                    InboxListView)

app_name = 'myapp'

router = DefaultRouter()
router.register('profile', ProfileViewSet)
router.register('other_profile', OtherProfileViewSet)
router.register('goout', MyGoOutViewSet)
router.register('true_goout', TrueGoOutUserViewSet)
router.register('favorite', MatchingViewSet)
router.register('my_favorite', MyApproachingViewSet)
router.register('dm-message', DirectMessageViewSet)
router.register('dm-inbox', InboxListView)

urlpatterns = [
    path('users/create', CreateUserView.as_view(), name='users-create'),
    path('users/<pk>', UserView.as_view(), name='users'),
    path('users/profile/<pk>', MyProfileView.as_view(), name='users-profile'),
    path('users/goout/<pk>', MyGoOutEditView.as_view(), name='edit-goout'),
    path('', include(router.urls)),
]
