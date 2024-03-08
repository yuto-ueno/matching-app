from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Profile, GoOut, Matching, DirectMessage


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('email', 'password', 'id')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 8}}

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user

    def update(self, use_instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                use_instance.set_password(value)
            else:
                setattr(use_instance, attr, value)
        use_instance.save()
        return use_instance


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            'user', 'is_kyc', 'age', 'sex', 'hobby', 'elementary_school', 'middle_school',
            'high_school', 'university',
        )
        extra_kwargs = {'user': {'read_only': True}}


class GoOutSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoOut
        fields = ('user', 'go_out', )
        extra_kwargs = {'user': {'read_only': True}}


class MatchingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matching
        fields = ('id', 'approaching', 'approached',)
        extra_kwargs = {'approaching': {'read_only': True}}


class DirectMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DirectMessage
        fields = ('id', 'sender', 'receiver', 'message',)
        extra_kwargs = {'sender': {'read_only': True}}
