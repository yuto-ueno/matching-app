from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (CreateUserView,
                    UserView,
                    ProfileViewSet,
                    EditProfileView,
                    OtherProfileViewSet,
                    FavoriteProfileViewSet,
                    MyGoOutViewSet,
                    MyGoOutEditView,
                    TrueGoOutUserViewSet,
                    ApproachedMeViewSet,
                    MyApproachingViewSet,
                    ApproachingDeleteView,
                    DirectMessageViewSet,
                    InboxListView)

app_name = 'myapp'

router = DefaultRouter()
router.register('profile', ProfileViewSet)
router.register('other_profile', OtherProfileViewSet)
router.register('favorite_profile', FavoriteProfileViewSet)
router.register('goout', MyGoOutViewSet)
router.register('true_goout', TrueGoOutUserViewSet)
router.register('approached_me', ApproachedMeViewSet)
router.register('my_favorite', MyApproachingViewSet)
router.register('dm-message', DirectMessageViewSet)
router.register('dm-inbox', InboxListView)

urlpatterns = [
    path('users/create', CreateUserView.as_view(), name='users-create'),
    path('users/<pk>', UserView.as_view(), name='users'),
    path('users/edit_profile/<pk>', EditProfileView.as_view(), name='users-profile'),
    path('users/goout/<pk>', MyGoOutEditView.as_view(), name='edit-goout'),
    path('delete_favorite', ApproachingDeleteView.as_view(), name='delete-favorite'),
    path('', include(router.urls)),
]
