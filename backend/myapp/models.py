from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models
from django.utils import timezone
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator


# ユーザーの作成、取得、更新、削除などのDB操作を抽象化したクラス
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)


# ユーザー情報のDBの設計
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    objects = CustomUserManager()
    USERNAME_FIELD = "email"


# プロフィールのDB設計
class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, primary_key=True, on_delete=models.CASCADE,
                                related_name='profile')
    last_name = models.CharField("姓", default="", max_length=100)
    first_name = models.CharField("名", default="", max_length=100)
    is_kyc = models.BooleanField("本人確認", default=False)
    age = models.PositiveSmallIntegerField(
        "年齢",
        default=20,
        validators=[
            MinValueValidator(18, "18歳未満は登録できません"),
            MaxValueValidator(35, "36歳以上は登録できません")
        ]
    )
    SEX = [('male', '男性'), ('female', '女性')]
    sex = models.CharField("性別", max_length=16, choices=SEX, default="")
    hobby = models.TextField("趣味", max_length=1000)
    elementary_school = models.CharField("小学校", max_length=100, blank=True, null=True, default="")
    middle_school = models.CharField("中学校", max_length=100, blank=True, null=True, default="")
    high_school = models.CharField("高校", max_length=100, blank=True, null=True, default="")
    university = models.CharField("大学", max_length=100, blank=True, null=True, default="")


# 外出ボタンのDB設計
class GoOut(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, primary_key=True, on_delete=models.CASCADE, )
    go_out = models.BooleanField("外出ボタン", default=False)


# マッチング情報のDB設計
class Matching(models.Model):
    approaching = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='approaching', default='',
        on_delete=models.CASCADE,
    )
    approached = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='approached', default='',
        on_delete=models.CASCADE,
    )

    class Meta:
        unique_together = (('approaching', 'approached'),)


# message情報のDB設計
class DirectMessage(models.Model):
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='sender',
        on_delete=models.CASCADE, default='',
    )
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='receiver',
        on_delete=models.CASCADE, default='',
    )
    message = models.CharField(verbose_name="メッセージ", max_length=200, default='',)
    created_at = models.DateTimeField("送信時間", auto_now_add=True)
