from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _
from image_cropping import ImageRatioField

class CustomUserManager(BaseUserManager):
    """Define a model manager for User model with email as the unique identifier"""

    def create_user(self, email, username, password=None, **extra_fields):
        """Create and save a User with the given email, username and password"""
        if not email:
            raise ValueError(_('The Email must be set'))
        if not username:
            raise ValueError(_('The Username must be set'))
            
        email = self.normalize_email(email)
        username = self.model.normalize_username(username)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, username, password, **extra_fields):
        """Create and save a SuperUser with the given email, username and password"""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        return self.create_user(email, username, password, **extra_fields)

class User(AbstractUser):
    """Custom User model with email as unique identifier"""
    email = models.EmailField(_('email address'), unique=True)
    username = models.CharField(_('username'), max_length=150, unique=True)
    phone = models.CharField(_('phone number'), max_length=15, blank=True, null=True)
    photo = models.ImageField(upload_to='profile_photos/', blank=True, null=True)
    cropping = ImageRatioField('photo', '200x200', size_warning=True)
    bio = models.TextField(_('bio'), max_length=500, blank=True)
    date_of_birth = models.DateField(_('date of birth'), null=True, blank=True)
    address = models.CharField(_('address'), max_length=255, blank=True)
    occupation = models.CharField(_('occupation'), max_length=100, blank=True)
    education = models.CharField(_('education'), max_length=200, blank=True)
    social_links = models.JSONField(_('social links'), default=dict, blank=True)
    last_profile_update = models.DateTimeField(_('last profile update'), auto_now=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    objects = CustomUserManager()
    
    def __str__(self):
        return self.email

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

class LoginInfo(models.Model):
    """Model to track login attempts"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='login_attempts')
    timestamp = models.DateTimeField(auto_now_add=True)
    success = models.BooleanField(default=False)
    device_name = models.CharField(max_length=255, null=True, blank=True)
    user_agent = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.user.email} - {self.timestamp} - {'Success' if self.success else 'Failed'}"

    class Meta:
        ordering = ['-timestamp']
        verbose_name = _('login info')
        verbose_name_plural = _('login info')

class Profile(models.Model):
    """Model to store user profile information"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    cover_photo = models.ImageField(upload_to='cover_photos/', blank=True, null=True)
    bio = models.TextField(max_length=500, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    address = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    occupation = models.CharField(max_length=100, blank=True)
    company = models.CharField(max_length=100, blank=True)
    education = models.CharField(max_length=200, blank=True)
    skills = models.TextField(blank=True)
    interests = models.TextField(blank=True)
    website = models.URLField(max_length=200, blank=True)
    linkedin = models.URLField(max_length=200, blank=True)
    github = models.URLField(max_length=200, blank=True)
    twitter = models.URLField(max_length=200, blank=True)
    facebook = models.URLField(max_length=200, blank=True)
    instagram = models.URLField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"

    class Meta:
        verbose_name = _('profile')
        verbose_name_plural = _('profiles')

class SuccessStory(models.Model):
    name = models.CharField(max_length=100)
    career_path = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='success_stories/')
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_approved = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "Success Stories"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name}'s Success Story"