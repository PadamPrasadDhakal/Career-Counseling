from django.urls import path
from . import views
from django.contrib.auth.views import LogoutView
app_name = 'core'

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('test/', views.psychometric_test, name='test'),
    path('career-paths/', views.career_paths, name='career_paths'),
    path('career-paths/technology/', views.technology_careers, name='technology_careers'),
    path('career-paths/healthcare/', views.healthcare_careers, name='healthcare_careers'),
    path('career-paths/business/', views.business_careers, name='business_careers'),
    path('career-paths/creative-arts/', views.creative_arts_careers, name='creative_arts_careers'),
    path('career-paths/education/', views.education_careers, name='education_careers'),
    path('career-paths/science-research/', views.science_research_careers, name='science_research_careers'),
    path('contact/', views.contact, name='contact'),
    path('signup/', views.signup, name='signup'),
    path('login/', views.user_login, name='login'),
    path('profile/', views.profile, name='profile'),
    path('profile/edit/', views.edit_profile, name='edit_profile'),
    path('developers/', views.developers, name='developers'),
    path('logout/', views.user_logout, name='logout'),
    path('change_password/', views.change_password, name='change_password'),
    path('share-story/', views.share_story, name='share_story'),
] 