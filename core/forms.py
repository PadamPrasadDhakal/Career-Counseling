from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from image_cropping import ImageCropWidget
import re

User = get_user_model()

class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True)
    
    class Meta:
        model = User
        fields = ('email', 'username', 'password1', 'password2')
    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise ValidationError("Email already exists")
        return email
    
    def clean_username(self):
        username = self.cleaned_data.get('username')
        if User.objects.filter(username=username).exists():
            raise ValidationError("Username already exists")
        return username
    
    def clean_password1(self):
        password = self.cleaned_data.get('password1')
        
        # Length validation
        if len(password) < 8:
            raise ValidationError("Password must be at least 8 characters long")
        
        # Check for uppercase
        if not re.search(r'[A-Z]', password):
            raise ValidationError("Password must contain at least one uppercase letter")
        
        # Check for lowercase
        if not re.search(r'[a-z]', password):
            raise ValidationError("Password must contain at least one lowercase letter")
        
        # Check for digit
        if not re.search(r'\d', password):
            raise ValidationError("Password must contain at least one number")
        
        # Check for special character
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            raise ValidationError("Password must contain at least one special character")
        
        return password
    
    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')
        
        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords don't match")
        
        return password2

class CustomLoginForm(AuthenticationForm):
    """Form for user login with email"""
    username = forms.EmailField(widget=forms.EmailInput(attrs={'autofocus': True}), label="Email")
    remember_me = forms.BooleanField(required=False)

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = User
        fields = [
            'username', 'email', 'phone', 'photo', 'cropping',
            'bio', 'date_of_birth', 'address', 'occupation',
            'education', 'social_links'
        ]
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'class': 'form-control'}),
            'phone': forms.TextInput(attrs={'class': 'form-control'}),
            'photo': forms.FileInput(attrs={'class': 'form-control'}),
            'bio': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'date_of_birth': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
            'address': forms.TextInput(attrs={'class': 'form-control'}),
            'occupation': forms.TextInput(attrs={'class': 'form-control'}),
            'education': forms.TextInput(attrs={'class': 'form-control'}),
            'social_links': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': '{"linkedin": "https://linkedin.com/in/username", "github": "https://github.com/username"}'
            }),
        }

    def clean_phone(self):
        phone = self.cleaned_data.get('phone')
        if phone:
            # Remove any non-digit characters
            phone = ''.join(filter(str.isdigit, phone))
            # Check if the phone number is valid (you can add more validation)
            if len(phone) < 10:
                raise forms.ValidationError("Please enter a valid phone number")
        return phone

    def clean_social_links(self):
        social_links = self.cleaned_data.get('social_links')
        if social_links and not isinstance(social_links, dict):
            raise forms.ValidationError("Social links must be in valid JSON format")
        return social_links 

class PasswordChangeForm(forms.Form):
    old_password = forms.CharField(label='Old Password', widget=forms.PasswordInput)
    new_password = forms.CharField(label='New Password', widget=forms.PasswordInput)
    confirm_password = forms.CharField(label='Confirm New Password', widget=forms.PasswordInput)

    def clean_confirm_password(self):
        password1 = self.cleaned_data.get('new_password')
        password2 = self.cleaned_data.get('confirm_password')
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2    
    



