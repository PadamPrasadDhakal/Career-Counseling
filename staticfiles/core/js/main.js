// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled', 'shadow');
            } else {
                navbar.classList.remove('navbar-scrolled', 'shadow');
            }
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Psychometric Test Logic
    initPsychometricTest();

    // Animation on Scroll
    animateOnScroll();
});

// Initialize Psychometric Test
function initPsychometricTest() {
    const testContainer = document.getElementById('psychometric-test');
    if (!testContainer) return;

    const questions = [
        {
            id: 1,
            question: 'I enjoy solving complex problems.',
            category: 'analytical'
        },
        {
            id: 2,
            question: 'I prefer working with people rather than working alone.',
            category: 'social'
        },
        {
            id: 3,
            question: 'I am good at coming up with creative ideas.',
            category: 'creative'
        },
        {
            id: 4,
            question: 'I like organizing and planning tasks in detail.',
            category: 'practical'
        },
        {
            id: 5,
            question: 'I enjoy analyzing data and finding patterns.',
            category: 'analytical'
        },
        {
            id: 6,
            question: 'I am good at understanding how others feel.',
            category: 'social'
        },
        {
            id: 7,
            question: 'I enjoy expressing myself through art or writing.',
            category: 'creative'
        },
        {
            id: 8,
            question: 'I prefer following established procedures.',
            category: 'practical'
        },
        {
            id: 9,
            question: 'I enjoy researching and learning about new subjects.',
            category: 'analytical'
        },
        {
            id: 10,
            question: 'I am comfortable speaking in front of groups.',
            category: 'social'
        }
    ];

    let currentQuestion = 0;
    let answers = {};
    let questionElement = document.getElementById('question');
    let progressBar = document.getElementById('progress-bar');
    let optionsContainer = document.getElementById('options-container');
    let nextButton = document.getElementById('next-question');
    let previousButton = document.getElementById('prev-question');
    let resultContainer = document.getElementById('result-container');

    // Initialize the test
    if (questionElement && progressBar && optionsContainer) {
        showQuestion(currentQuestion);

        // Next button event listener
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (currentQuestion < questions.length - 1) {
                    currentQuestion++;
                    showQuestion(currentQuestion);
                } else {
                    showResults();
                }
            });
        }

        // Previous button event listener
        if (previousButton) {
            previousButton.addEventListener('click', () => {
                if (currentQuestion > 0) {
                    currentQuestion--;
                    showQuestion(currentQuestion);
                }
            });
        }
    }

    // Function to display a question
    function showQuestion(index) {
        const question = questions[index];
        questionElement.textContent = question.question;
        
        // Update progress
        const progress = ((index + 1) / questions.length) * 100;
        progressBar.style.width = progress + '%';
        progressBar.setAttribute('aria-valuenow', progress);
        
        // Enable/disable previous button
        previousButton.disabled = index === 0;
        
        // Update next button text
        nextButton.textContent = index === questions.length - 1 ? 'Finish Test' : 'Next Question';
        
        // Clear options
        optionsContainer.innerHTML = '';
        
        // Create options
        const options = [
            { value: 1, text: 'Strongly Disagree' },
            { value: 2, text: 'Disagree' },
            { value: 3, text: 'Neutral' },
            { value: 4, text: 'Agree' },
            { value: 5, text: 'Strongly Agree' }
        ];
        
        options.forEach(option => {
            const label = document.createElement('label');
            label.className = 'option-label';
            
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'answer';
            input.value = option.value;
            input.className = 'option-input';
            
            // Check if this option was previously selected
            if (answers[question.id] && answers[question.id].value === option.value) {
                input.checked = true;
            }
            
            input.addEventListener('change', () => {
                answers[question.id] = {
                    value: option.value,
                    category: question.category
                };
                nextButton.disabled = false;
            });
            
            const span = document.createElement('span');
            span.className = 'option-text';
            span.textContent = option.text;
            
            label.appendChild(input);
            label.appendChild(span);
            optionsContainer.appendChild(label);
        });
        
        // Disable next button if no option is selected for this question
        nextButton.disabled = !answers[question.id];
    }

    // Function to display results
    function showResults() {
        // Hide test UI
        document.getElementById('test-ui').style.display = 'none';
        resultContainer.style.display = 'block';
        
        // Calculate scores by category
        const scores = {
            analytical: 0,
            social: 0,
            creative: 0,
            practical: 0
        };
        
        let totalQuestions = {
            analytical: 0,
            social: 0,
            creative: 0,
            practical: 0
        };
        
        // Calculate total score for each category
        questions.forEach(question => {
            totalQuestions[question.category]++;
            if (answers[question.id]) {
                scores[question.category] += answers[question.id].value;
            }
        });
        
        // Calculate percentages
        const percentages = {};
        for (const category in scores) {
            percentages[category] = (scores[category] / (totalQuestions[category] * 5)) * 100;
        }
        
        // Find the highest scoring category
        let highestCategory = Object.keys(percentages).reduce((a, b) => 
            percentages[a] > percentages[b] ? a : b
        );
        
        // Display result message
        const resultMessage = document.getElementById('result-message');
        const resultDetails = document.getElementById('result-details');
        
        if (resultMessage && resultDetails) {
            // Map category to career suggestions
            const careerSuggestions = {
                analytical: {
                    title: 'Analytical Thinker',
                    careers: ['Data Scientist', 'Software Engineer', 'Financial Analyst', 'Research Scientist', 'Business Analyst'],
                    message: 'You excel at problem-solving and logical reasoning. You enjoy analyzing data and finding patterns.'
                },
                social: {
                    title: 'Social Connector',
                    careers: ['Human Resources Manager', 'Teacher', 'Counselor', 'Sales Manager', 'Public Relations Specialist'],
                    message: 'You have strong interpersonal skills and enjoy working with people. You are empathetic and good at communication.'
                },
                creative: {
                    title: 'Creative Innovator',
                    careers: ['Graphic Designer', 'Writer', 'Marketing Specialist', 'UX/UI Designer', 'Content Creator'],
                    message: 'You have a strong imagination and enjoy expressing yourself. You think outside the box and come up with original ideas.'
                },
                practical: {
                    title: 'Practical Organizer',
                    careers: ['Project Manager', 'Operations Manager', 'Accountant', 'Administrative Director', 'Logistics Coordinator'],
                    message: 'You are detail-oriented and well-organized. You prefer structure and following established procedures.'
                }
            };
            
            // Display the result
            resultMessage.innerHTML = `
                <h3>Your Personality Type: ${careerSuggestions[highestCategory].title}</h3>
                <p>${careerSuggestions[highestCategory].message}</p>
            `;
            
            // Create chart
            const chartCanvas = document.createElement('canvas');
            chartCanvas.id = 'results-chart';
            resultDetails.appendChild(chartCanvas);
            
            // Display recommended careers
            const careersDiv = document.createElement('div');
            careersDiv.innerHTML = `
                <h4 class="mt-4">Recommended Career Paths:</h4>
                <ul class="list-group">
                    ${careerSuggestions[highestCategory].careers.map(career => 
                        `<li class="list-group-item">${career}</li>`
                    ).join('')}
                </ul>
                <p class="mt-3">Remember, this is just a starting point! We recommend exploring these career paths further or consulting with a career counselor for personalized guidance.</p>
                <a href="#" class="btn btn-primary mt-3">Explore Career Paths</a>
            `;
            resultDetails.appendChild(careersDiv);
            
            // Display a chart if Chart.js is available
            if (typeof Chart !== 'undefined') {
                new Chart(chartCanvas.getContext('2d'), {
                    type: 'radar',
                    data: {
                        labels: ['Analytical', 'Social', 'Creative', 'Practical'],
                        datasets: [{
                            label: 'Your Personality Profile',
                            data: [
                                percentages.analytical,
                                percentages.social,
                                percentages.creative,
                                percentages.practical
                            ],
                            backgroundColor: 'rgba(52, 152, 219, 0.2)',
                            borderColor: 'rgba(52, 152, 219, 1)',
                            pointBackgroundColor: 'rgba(52, 152, 219, 1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
                        }]
                    },
                    options: {
                        scale: {
                            ticks: {
                                beginAtZero: true,
                                max: 100
                            }
                        }
                    }
                });
            }
        }
    }
}

// Animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
} 