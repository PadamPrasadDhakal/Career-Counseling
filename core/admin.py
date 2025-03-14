from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, LoginInfo, Profile
from image_cropping import ImageCroppingMixin

class CustomUserAdmin(ImageCroppingMixin, UserAdmin):
    model = User
    list_display = ('email', 'username', 'phone', 'occupation', 'is_staff', 'is_active', 'last_profile_update')
    list_filter = ('is_staff', 'is_active', 'occupation', 'education')
    search_fields = ('email', 'username', 'phone', 'bio', 'address')
    ordering = ('email',)
    
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Personal Info', {
            'fields': ('first_name', 'last_name', 'phone', 'photo', 'cropping', 'bio', 
                      'date_of_birth', 'address', 'occupation', 'education')
        }),
        ('Social', {
            'fields': ('social_links',),
        }),
        ('Important dates', {
            'fields': ('last_login', 'date_joined', 'last_profile_update')
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'is_staff', 'is_active')
        }),
    )
    readonly_fields = ('last_profile_update',)

class LoginInfoAdmin(admin.ModelAdmin):
    list_display = ('user', 'timestamp', 'success', 'device_name')
    list_filter = ('success', 'timestamp')
    search_fields = ('user__email', 'user__username', 'device_name')
    ordering = ('-timestamp',)
    readonly_fields = ('timestamp',)

class ProfileAdmin(ImageCroppingMixin, admin.ModelAdmin):
    list_display = ('user', 'occupation', 'education', 'created_at', 'updated_at')
    list_filter = ('occupation', 'education', 'created_at', 'updated_at')
    search_fields = ('user__username', 'user__email', 'bio', 'occupation', 'education')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('User Information', {
            'fields': ('user', 'profile_picture', 'cover_photo', 'bio')
        }),
        ('Personal Details', {
            'fields': ('date_of_birth', 'phone_number', 'address', 'city', 'country')
        }),
        ('Professional Information', {
            'fields': ('occupation', 'company', 'education', 'skills', 'interests')
        }),
        ('Social Links', {
            'fields': ('website', 'linkedin', 'github', 'twitter', 'facebook', 'instagram')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )

admin.site.register(User, CustomUserAdmin)
admin.site.register(LoginInfo, LoginInfoAdmin)
admin.site.register(Profile, ProfileAdmin)
