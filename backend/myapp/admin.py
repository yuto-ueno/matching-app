from django.contrib import admin
from .models import CustomUser, Profile, GoOut ,Matching, DirectMessage


class CustomUserAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "email",
        "is_staff",
        "is_active",
        "date_joined",
    )


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'last_name', 'first_name', 'is_kyc', 'age', 'sex', 'elementary_school',
                    'middle_school', 'high_school', 'university', )


class GoOutAdmin(admin.ModelAdmin):
    list_display = ('user', 'go_out',)


class MatchingAdmin(admin.ModelAdmin):
    list_display = ('approaching', 'approached',)


class DirectMessageAdmin(admin.ModelAdmin):
    list_display = ('sender', 'receiver', 'message', 'created_at')


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(GoOut, GoOutAdmin)
admin.site.register(Matching, MatchingAdmin)
admin.site.register(DirectMessage, DirectMessageAdmin)
