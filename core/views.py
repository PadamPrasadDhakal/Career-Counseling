from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.forms import PasswordChangeForm
from .forms import CustomUserCreationForm, CustomLoginForm, UserProfileForm
from .models import LoginInfo, User, SuccessStory

# Create your views here.
def home(request):
    """Home page view with hero section, about, test section, etc."""
    # Messages will be automatically handled by the template
    return render(request, 'core/home.html')

def about(request):
    """About page with information on career counseling."""
    return render(request, 'core/about.html')

def psychometric_test(request):
    """Psychometric test page with the actual test interface."""
    return render(request, 'core/test.html')

def career_paths(request):
    """Career paths page showing different career options."""
    return render(request, 'core/career_paths.html')

def contact(request):
    """Contact page with contact form."""
    return render(request, 'core/contact.html')

def get_device_name(user_agent_string):
    """Helper function to extract device name from user agent string"""
    import httpagentparser
    agent = httpagentparser.detect(user_agent_string)
    
    if agent.get('platform', {}).get('name'):
        device = f"{agent.get('platform', {}).get('name', 'Unknown')} - {agent.get('browser', {}).get('name', 'Unknown')}"
    else:
        device = "Unknown Device"
    
    return device

def signup(request):
    """User registration view with enhanced password validation."""
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            # Explicitly create user from form data
            email = form.cleaned_data.get('email')
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            
            # Create and save the new user
            user = User.objects.create_user(
                email=email,
                username=username,
                password=password
            )
            
            # Save login record for this signup
            user_agent = request.META.get('HTTP_USER_AGENT', '')
            LoginInfo.objects.create(
                user=user,
                success=True,
                device_name=get_device_name(user_agent),
                user_agent=user_agent
            )
            
            # Log in the user after signup - specify the backend
            from django.contrib.auth import login
            from django.contrib.auth.backends import ModelBackend
            login(request, user, backend='django.contrib.auth.backends.ModelBackend')
            messages.success(request, f"Account created successfully for {username}!")
            return redirect('core:home')
        else:
            for field, errors in form.errors.items():
                for error in errors:
                    messages.error(request, f"{field}: {error}")
    else:
        form = CustomUserCreationForm()
    return render(request, 'core/signup.html', {'form': form})

def user_login(request):
    """User login view with login tracking."""
    if request.method == 'POST':
        form = CustomLoginForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            
            # Record successful login
            user_agent = request.META.get('HTTP_USER_AGENT', '')
            LoginInfo.objects.create(
                user=user, 
                success=True, 
                device_name=get_device_name(user_agent),
                user_agent=user_agent
            )
            messages.success(request, f"Welcome back, {user.username}!")
            return redirect('core:home')
        else:
            for field, errors in form.errors.items():
                for error in errors:
                    messages.error(request, f"{field}: {error}")
            
            # For failed login attempts, try to find user by email 
            # and record the attempt if we can identify the user
            email = form.cleaned_data.get('username') if hasattr(form, 'cleaned_data') else None
            if email:
                try:
                    user = User.objects.get(email=email)
                    user_agent = request.META.get('HTTP_USER_AGENT', '')
                    LoginInfo.objects.create(
                        user=user, 
                        success=False, 
                        device_name=get_device_name(user_agent),
                        user_agent=user_agent
                    )
                except User.DoesNotExist:
                    pass
    else:
        form = CustomLoginForm()
    return render(request, 'core/login.html', {'form': form})

@login_required
def profile(request):
    """User profile view."""
    return render(request, 'core/profile.html')

def developers(request):
    """Developers page with detailed information about the development team."""
    return render(request, 'core/developers.html')

def user_logout(request):
    """Custom logout view with success message."""
    logout(request)
    messages.success(request, "You are logged out")
    return redirect('core:home')

def technology_careers(request):
    """View for technology careers page."""
    context = {
        'title': 'Technology Careers',
        'careers': [
            {
                'title': 'Software Developer',
                'description': 'Design, develop, and maintain software applications and systems.',
                'skills': ['Programming', 'Problem Solving', 'Software Design', 'Team Collaboration'],
                'salary_range': '$60,000 - $150,000+',
                'education': "Bachelor's degree in Computer Science or related field",
                'growth': 'High demand with 22% growth expected through 2030'
            },
            {
                'title': 'Data Scientist',
                'description': 'Analyze complex data sets to help guide business decisions.',
                'skills': ['Statistics', 'Machine Learning', 'Python/R', 'Data Visualization'],
                'salary_range': '$70,000 - $160,000+',
                'education': "Master's degree in Data Science, Statistics, or related field",
                'growth': 'Very high demand with 31% growth expected through 2030'
            },
            {
                'title': 'Cybersecurity Analyst',
                'description': 'Protect organizations from digital threats and implement security measures.',
                'skills': ['Network Security', 'Threat Analysis', 'Security Tools', 'Risk Management'],
                'salary_range': '$65,000 - $140,000+',
                'education': "Bachelor's degree in Cybersecurity or related field",
                'growth': 'Critical demand with 33% growth expected through 2030'
            }
        ]
    }
    return render(request, 'core/career_paths/technology.html', context)

def healthcare_careers(request):
    """View for healthcare careers page."""
    context = {
        'title': 'Healthcare Careers',
        'careers': [
            {
                'title': 'Registered Nurse',
                'description': 'Provide and coordinate patient care, educate patients about health conditions.',
                'skills': ['Patient Care', 'Medical Knowledge', 'Communication', 'Critical Thinking'],
                'salary_range': '$50,000 - $110,000+',
                'education': "Bachelor's degree in Nursing",
                'growth': 'Strong demand with 9% growth expected through 2030'
            },
            {
                'title': 'Physical Therapist',
                'description': 'Help patients improve movement and manage pain after injuries or illnesses.',
                'skills': ['Anatomy Knowledge', 'Patient Care', 'Physical Stamina', 'Problem Solving'],
                'salary_range': '$70,000 - $100,000+',
                'education': "Doctoral Degree in Physical Therapy",
                'growth': 'High demand with 21% growth expected through 2030'
            },
            {
                'title': 'Medical Doctor',
                'description': 'Diagnose and treat illnesses and injuries.',
                'skills': ['Medical Expertise', 'Decision Making', 'Communication', 'Leadership'],
                'salary_range': '$150,000 - $300,000+',
                'education': "Medical Doctor (MD) degree",
                'growth': 'Steady demand with 3% growth expected through 2030'
            }
        ]
    }
    return render(request, 'core/career_paths/healthcare.html', context)

def business_careers(request):
    """View for business careers page."""
    context = {
        'title': 'Business Careers',
        'careers': [
            {
                'title': 'Financial Analyst',
                'description': 'Analyze financial data and make recommendations for business decisions.',
                'skills': ['Financial Analysis', 'Excel', 'Research', 'Communication'],
                'salary_range': '$55,000 - $120,000+',
                'education': "Bachelor's degree in Finance or related field",
                'growth': 'Positive outlook with 6% growth expected through 2030'
            },
            {
                'title': 'Marketing Manager',
                'description': 'Develop and implement marketing strategies to promote products/services.',
                'skills': ['Marketing Strategy', 'Analytics', 'Creativity', 'Project Management'],
                'salary_range': '$65,000 - $150,000+',
                'education': "Bachelor's degree in Marketing or related field",
                'growth': 'Strong demand with 10% growth expected through 2030'
            },
            {
                'title': 'Management Consultant',
                'description': 'Help organizations improve their performance and efficiency.',
                'skills': ['Problem Solving', 'Analytics', 'Communication', 'Strategy'],
                'salary_range': '$75,000 - $200,000+',
                'education': "MBA or related advanced degree",
                'growth': 'High demand with 14% growth expected through 2030'
            }
        ]
    }
    return render(request, 'core/career_paths/business.html', context)

def creative_arts_careers(request):
    """View for creative arts careers page."""
    context = {
        'title': 'Creative Arts Careers',
        'careers': [
            {
                'title': 'Graphic Designer',
                'description': 'Create visual content for digital and print media.',
                'skills': ['Design Software', 'Creativity', 'Typography', 'Visual Communication'],
                'salary_range': '$45,000 - $95,000+',
                'education': "Bachelor's degree in Graphic Design",
                'growth': 'Moderate growth with 3% expected through 2030'
            },
            {
                'title': 'UX/UI Designer',
                'description': 'Design user interfaces and experiences for digital products.',
                'skills': ['User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
                'salary_range': '$60,000 - $130,000+',
                'education': "Bachelor's degree in Design or related field",
                'growth': 'High demand with 13% growth expected through 2030'
            },
            {
                'title': 'Art Director',
                'description': 'Lead visual style and creative direction for projects.',
                'skills': ['Leadership', 'Design', 'Project Management', 'Creative Vision'],
                'salary_range': '$70,000 - $160,000+',
                'education': "Bachelor's degree in Art or related field",
                'growth': 'Stable outlook with 11% growth expected through 2030'
            }
        ]
    }
    return render(request, 'core/career_paths/creative_arts.html', context)

def education_careers(request):
    """View for education careers page."""
    context = {
        'title': 'Education Careers',
        'careers': [
            {
                'title': 'High School Teacher',
                'description': 'Teach academic lessons and skills to high school students.',
                'skills': ['Subject Expertise', 'Communication', 'Classroom Management', 'Patience'],
                'salary_range': '$45,000 - $85,000+',
                'education': "Bachelor's degree in Education + Teaching License",
                'growth': 'Stable demand with 8% growth expected through 2030'
            },
            {
                'title': 'Special Education Teacher',
                'description': 'Work with students who have learning, emotional, or physical disabilities.',
                'skills': ['Special Education Methods', 'Patience', 'Communication', 'Adaptability'],
                'salary_range': '$50,000 - $90,000+',
                'education': "Bachelor's degree in Special Education",
                'growth': 'Growing demand with 8% growth expected through 2030'
            },
            {
                'title': 'University Professor',
                'description': 'Teach and conduct research at the college level.',
                'skills': ['Research', 'Teaching', 'Writing', 'Subject Expertise'],
                'salary_range': '$60,000 - $180,000+',
                'education': "Ph.D. in relevant field",
                'growth': 'Moderate growth with 12% expected through 2030'
            }
        ]
    }
    return render(request, 'core/career_paths/education.html', context)

def science_research_careers(request):
    """View for science research careers page."""
    context = {
        'title': 'Science Research Careers',
        'careers': [
            {
                'title': 'Research Scientist',
                'description': 'Conduct research to advance knowledge in specific scientific fields.',
                'skills': ['Research Methods', 'Data Analysis', 'Technical Writing', 'Lab Skills'],
                'salary_range': '$60,000 - $130,000+',
                'education': "Ph.D. in relevant scientific field",
                'growth': 'Steady growth with 8% expected through 2030'
            },
            {
                'title': 'Biomedical Engineer',
                'description': 'Design and develop medical equipment and devices.',
                'skills': ['Engineering', 'Biology', 'Problem Solving', 'Medical Knowledge'],
                'salary_range': '$65,000 - $140,000+',
                'education': "Bachelor's or Master's in Biomedical Engineering",
                'growth': 'Strong growth with 6% expected through 2030'
            },
            {
                'title': 'Environmental Scientist',
                'description': 'Study environmental problems and develop solutions.',
                'skills': ['Environmental Science', 'Data Analysis', 'Field Work', 'Report Writing'],
                'salary_range': '$50,000 - $120,000+',
                'education': "Bachelor's degree in Environmental Science",
                'growth': 'Growing demand with 8% expected through 2030'
            }
        ]
    }
    return render(request, 'core/career_paths/science_research.html', context)

@login_required
def edit_profile(request):
    if request.method == 'POST':
        form = UserProfileForm(request.POST, request.FILES, instance=request.user)
        if form.is_valid():
            # Save the form data
            form.save()
            messages.success(request, 'Your profile has been updated successfully.')
            return redirect('core:profile')
        else:
            for field, errors in form.errors.items():
                for error in errors:
                    messages.error(request, f"{field}: {error}")
            
    return redirect('core:profile')

def change_password(request):
    """View for changing user password."""
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)
            messages.success(request, 'Your password has been changed successfully.')
            return redirect('core:profile')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = PasswordChangeForm(request.user)
    return render(request, 'core/change_password.html', {'form': form})

@login_required
def share_story(request):
    if request.method == 'POST':
        try:
            story = SuccessStory(
                name=request.POST['name'],
                career_path=request.POST['career_path'],
                photo=request.FILES['photo'],
                message=request.POST['message']
            )
            story.save()
            messages.success(request, 'Thank you for sharing your story! It will be reviewed and published soon.')
            return redirect('core:home')
        except Exception as e:
            messages.error(request, 'There was an error submitting your story. Please try again.')
            return redirect('core:share_story')
    
    return render(request, 'core/share_story.html')
