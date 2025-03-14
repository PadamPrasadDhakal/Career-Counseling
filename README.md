# Career Council - Career Counseling Website with Psychometric Test

A comprehensive career counseling platform that helps users discover their ideal career paths through a scientifically validated psychometric test. The website provides personalized career recommendations based on personality traits, interests, and aptitudes.

## Features

- **Psychometric Testing**: Interactive test to analyze personality traits, aptitudes, and career interests
- **Personalized Career Recommendations**: AI-powered suggestions based on test results
- **Career Path Exploration**: Detailed information on various career options across industries
- **User Authentication**: Secure signup and login functionality
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)

## Tech Stack

- **Backend**: Django (Python)
- **Frontend**: HTML, CSS, JavaScript
- **Database**: SQLite (development) / PostgreSQL (production)
- **Libraries**: 
  - Bootstrap 5 for responsive UI
  - Chart.js for data visualization
  - Font Awesome for icons

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/career-council.git
   cd career-council
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Apply migrations:
   ```
   python manage.py migrate
   ```

6. Create a superuser (admin):
   ```
   python manage.py createsuperuser
   ```

7. Run the development server:
   ```
   python manage.py runserver
   ```

8. Access the website at http://127.0.0.1:8000/

## Project Structure

```
career_council/
├── career_council/        # Project settings
├── core/                  # Main application
│   ├── migrations/        # Database migrations
│   ├── static/            # Static files (CSS, JS, images)
│   ├── templates/         # HTML templates
│   ├── admin.py           # Admin configuration
│   ├── models.py          # Database models
│   ├── urls.py            # URL routing
│   ├── views.py           # View functions
│   └── ...
├── manage.py              # Django management script
├── requirements.txt       # Project dependencies
└── README.md              # Project documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Django](https://www.djangoproject.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Chart.js](https://www.chartjs.org/)
- [Font Awesome](https://fontawesome.com/) 