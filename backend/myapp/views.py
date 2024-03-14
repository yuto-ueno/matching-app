from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView, DestroyAPIView
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from .models import CustomUser, Profile, GoOut, Matching, DirectMessage
from .serializers import UserSerializer, ProfileSerializer, GoOutSerializer, MatchingSerializer, DirectMessageSerializer


# ユーザーの登録
class CreateUserView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


# 自分のユーザー情報（メールとパスワード）の取得と更新
class UserView(RetrieveUpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return self.queryset.filter(id=self.request.user.id)


# 自分のプロフィールの取得と作成（GoOutはデフォルトでFalseが登録される）
class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        profile = serializer.save(user=self.request.user)
        go_out_defaults = {
            "user": profile.user,
            "go_out": False,
        }
        GoOut.objects.create(**go_out_defaults)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# 自分のプロフィールの取得と編集
class EditProfileView(RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


# 他の人のプロフィールの表示
class OtherProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    allowed_methods = ('GET',)

    def get_queryset(self):
        return self.queryset.exclude(pk=self.request.user.pk)


# LIKEした人のプロフィールの表示
class FavoriteProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    allowed_methods = ('GET',)

    def get_queryset(self):
        # リクエストパラメータからユーザーIDのリストを取得
        user_ids = self.request.query_params.getlist('user_ids')

        # ユーザーIDが存在しない場合は、空のリストを返す
        if not user_ids:
            return []

        # 指定されたユーザーIDのプロフィールのみを取得
        return self.queryset.filter(pk__in=user_ids)


# 自分のGoOutの状態と取得と更新
class MyGoOutViewSet(ModelViewSet):
    queryset = GoOut.objects.all()
    serializer_class = GoOutSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


# 自分のGoOut状態の変更と取得
class MyGoOutEditView(RetrieveUpdateAPIView):
    queryset = GoOut.objects.all()
    serializer_class = GoOutSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


# GoOutがTrueなユーザーの取得
class TrueGoOutUserViewSet(ModelViewSet):
    queryset = GoOut.objects.all()
    serializer_class = GoOutSerializer

    def get_queryset(self):
        return super().get_queryset().filter(go_out=True)


# 自分がアプローチされているリストの取得と作成
class ApproachedMeViewSet(ModelViewSet):
    queryset = Matching.objects.all()
    serializer_class = MatchingSerializer

    def get_queryset(self):
        return self.queryset.filter(approached=self.request.user)

    def perform_create(self, serializer):
        # POSTリクエストを送った時にapproachingフィールドに、requestユーザーを登録する
        serializer.save(approaching=self.request.user)


# 自分がアプローチしているリストの取得と作成
class MyApproachingViewSet(ModelViewSet):
    queryset = Matching.objects.all()
    serializer_class = MatchingSerializer

    def get_queryset(self):
        return self.queryset.filter(approaching=self.request.user)

    def perform_create(self, serializer):
        serializer.save(approaching=self.request.user)


class ApproachingDeleteView(DestroyAPIView):
    queryset = Matching.objects.all()
    serializer_class = MatchingSerializer

    def get_object(self):
        # リクエストパラメータから approached を取得
        approached = self.request.GET.get('approached')
        if not approached:
            return Response({'error': 'approached パラメータが必要です'}, status=400)

        # リクエストを送信しているユーザーを取得
        user = self.request.user

        # クエリセットをフィルタリング
        queryset = self.queryset.filter(
            Q(approaching=user.id) & Q(approached=approached)
        )

        # フィルタリング結果からオブジェクトを取得
        obj = queryset.get()

        return obj

    def get(self, request, *args, **kwargs):
        # リクエストパラメータから approached を取得
        approached = request.GET.get('approached')
        if not approached:
            return Response({'error': 'approached パラメータが必要です'}, status=400)

        # リクエストを送信しているユーザーを取得
        user = request.user

        # クエリセットをフィルタリング
        queryset = self.queryset.filter(
            Q(approaching=user.id) & Q(approached=approached)
        )

        # シリアライザでクエリセットをシリアル化
        serializer = self.serializer_class(queryset, many=True)

        # シリアル化されたデータを返す
        return Response(serializer.data)


class DirectMessageViewSet(ModelViewSet):
    queryset = DirectMessage.objects.all()
    serializer_class = DirectMessageSerializer

    def get_queryset(self):
        receiver_id = self.request.query_params.get('receiver_id')
        return self.queryset.filter(Q(sender=self.request.user) & Q(receiver=receiver_id))

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)


class InboxListView(ReadOnlyModelViewSet):
    queryset = DirectMessage.objects.all()
    serializer_class = DirectMessageSerializer

    def get_queryset(self):
        sender_id = self.request.query_params.get('sender_id')
        return self.queryset.filter(Q(receiver=self.request.user) & Q(sender=sender_id))
