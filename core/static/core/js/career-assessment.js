// Professional Career Assessment
document.addEventListener('DOMContentLoaded', function() {
    // Initialize test elements
    const startTestButton = document.getElementById('start-test');
    const testIntro = document.getElementById('test-intro');
    const testUI = document.getElementById('test-ui');
    const resultContainer = document.getElementById('result-container');
    const questionElement = document.getElementById('question');
    const progressBar = document.getElementById('progress-bar');
    const optionsContainer = document.getElementById('options-container');
    const nextButton = document.getElementById('next-question');
    const previousButton = document.getElementById('prev-question');
    const questionCounter = document.getElementById('question-counter');
    const categoryIndicator = document.getElementById('category-indicator');
    
    // Start button event listener
    if (startTestButton && testIntro && testUI) {
        startTestButton.addEventListener('click', function() {
            testIntro.style.display = 'none';
            testUI.style.display = 'block';
            showQuestion(currentQuestion);
        });
    }

    // Define Holland Code (RIASEC) questions
    const hollandQuestions = [
        // Realistic questions
        {
            id: 'r1',
            question: 'I enjoy working with tools, machines, or physical materials.',
            category: 'realistic',
            categoryName: 'Career Interest'
        },
        {
            id: 'r2',
            question: 'I prefer activities that involve physical labor or working outdoors.',
            category: 'realistic',
            categoryName: 'Career Interest'
        },
        {
            id: 'r3',
            question: 'I like working with my hands to build or fix things.',
            category: 'realistic',
            categoryName: 'Career Interest'
        },
        {
            id: 'r4',
            question: 'I enjoy tasks that produce tangible results.',
            category: 'realistic',
            categoryName: 'Career Interest'
        },
        // Investigative questions
        {
            id: 'i1',
            question: 'I enjoy solving complex problems or puzzles.',
            category: 'investigative',
            categoryName: 'Career Interest'
        },
        {
            id: 'i2',
            question: 'I like conducting research to better understand a topic.',
            category: 'investigative',
            categoryName: 'Career Interest'
        },
        {
            id: 'i3',
            question: 'I enjoy analyzing data to find patterns and draw conclusions.',
            category: 'investigative',
            categoryName: 'Career Interest'
        },
        {
            id: 'i4',
            question: 'I am curious about how and why things work the way they do.',
            category: 'investigative',
            categoryName: 'Career Interest'
        },
        // Artistic questions
        {
            id: 'a1',
            question: 'I enjoy expressing myself through art, music, writing, or performance.',
            category: 'artistic',
            categoryName: 'Career Interest'
        },
        {
            id: 'a2',
            question: 'I value creativity and original thinking.',
            category: 'artistic',
            categoryName: 'Career Interest'
        },
        {
            id: 'a3',
            question: 'I prefer activities that allow for self-expression and don\'t have a set of rules to follow.',
            category: 'artistic',
            categoryName: 'Career Interest'
        },
        {
            id: 'a4',
            question: 'I tend to think in unconventional ways.',
            category: 'artistic',
            categoryName: 'Career Interest'
        },
        // Social questions
        {
            id: 's1',
            question: 'I enjoy teaching or helping others learn new skills.',
            category: 'social',
            categoryName: 'Career Interest'
        },
        {
            id: 's2',
            question: 'I am good at understanding how others feel and what they need.',
            category: 'social',
            categoryName: 'Career Interest'
        },
        {
            id: 's3',
            question: 'I enjoy teamwork and collaboration more than working independently.',
            category: 'social',
            categoryName: 'Career Interest'
        },
        {
            id: 's4',
            question: 'I value making a positive impact on people\'s lives.',
            category: 'social',
            categoryName: 'Career Interest'
        },
        // Enterprising questions
        {
            id: 'e1',
            question: 'I am comfortable taking charge and leading others.',
            category: 'enterprising',
            categoryName: 'Career Interest'
        },
        {
            id: 'e2',
            question: 'I enjoy persuading others to adopt my ideas or purchase products/services.',
            category: 'enterprising',
            categoryName: 'Career Interest'
        },
        {
            id: 'e3',
            question: 'I like taking risks and initiating new projects.',
            category: 'enterprising',
            categoryName: 'Career Interest'
        },
        {
            id: 'e4',
            question: 'I am motivated by competition and achievement.',
            category: 'enterprising',
            categoryName: 'Career Interest'
        },
        // Conventional questions
        {
            id: 'c1',
            question: 'I enjoy working with numbers and keeping track of details.',
            category: 'conventional',
            categoryName: 'Career Interest'
        },
        {
            id: 'c2',
            question: 'I prefer working in structured environments with clear rules and procedures.',
            category: 'conventional',
            categoryName: 'Career Interest'
        },
        {
            id: 'c3',
            question: 'I am good at organizing and managing information or data.',
            category: 'conventional',
            categoryName: 'Career Interest'
        },
        {
            id: 'c4',
            question: 'I pay attention to detail and strive for accuracy in my work.',
            category: 'conventional',
            categoryName: 'Career Interest'
        }
    ];
    
    // Define Big Five personality questions
    const bigFiveQuestions = [
        // Openness questions
        {
            id: 'o1',
            question: 'I am interested in abstract ideas and theories.',
            category: 'openness',
            categoryName: 'Personality'
        },
        {
            id: 'o2',
            question: 'I enjoy experiencing new things and stepping outside my comfort zone.',
            category: 'openness',
            categoryName: 'Personality'
        },
        {
            id: 'o3',
            question: 'I have a vivid imagination and enjoy creative thinking.',
            category: 'openness',
            categoryName: 'Personality'
        },
        // Conscientiousness questions
        {
            id: 'c1',
            question: 'I make plans and follow through with them.',
            category: 'conscientiousness',
            categoryName: 'Personality'
        },
        {
            id: 'c2',
            question: 'I pay attention to details and strive for accuracy in my work.',
            category: 'conscientiousness',
            categoryName: 'Personality'
        },
        {
            id: 'c3',
            question: 'I like to keep things organized and follow a schedule.',
            category: 'conscientiousness',
            categoryName: 'Personality'
        },
        // Extraversion questions
        {
            id: 'e1',
            question: 'I feel energized after spending time with others.',
            category: 'extraversion',
            categoryName: 'Personality'
        },
        {
            id: 'e2',
            question: 'I enjoy being the center of attention in social situations.',
            category: 'extraversion',
            categoryName: 'Personality'
        },
        {
            id: 'e3',
            question: 'I prefer working with others rather than working alone.',
            category: 'extraversion',
            categoryName: 'Personality'
        },
        // Agreeableness questions
        {
            id: 'a1',
            question: 'I am concerned about others\' well-being and feelings.',
            category: 'agreeableness',
            categoryName: 'Personality'
        },
        {
            id: 'a2',
            question: 'I try to avoid conflicts and prefer to cooperate with others.',
            category: 'agreeableness',
            categoryName: 'Personality'
        },
        {
            id: 'a3',
            question: 'I tend to trust people and believe in their good intentions.',
            category: 'agreeableness',
            categoryName: 'Personality'
        },
        // Neuroticism questions (reverse scored for emotional stability)
        {
            id: 'n1',
            question: 'I remain calm under pressure or in stressful situations.',
            category: 'emotional_stability',
            categoryName: 'Personality',
            reverseScored: true
        },
        {
            id: 'n2',
            question: 'I rarely worry about things that might go wrong.',
            category: 'emotional_stability',
            categoryName: 'Personality',
            reverseScored: true
        },
        {
            id: 'n3',
            question: 'I maintain a positive outlook even when faced with setbacks.',
            category: 'emotional_stability',
            categoryName: 'Personality',
            reverseScored: true
        }
    ];
    
    // Combine all questions
    const allQuestions = [...hollandQuestions, ...bigFiveQuestions];
    
    // Test state variables
    let currentQuestion = 0;
    let answers = {};
    
    // Next button event listener
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (currentQuestion < allQuestions.length - 1) {
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
    
    // Function to display a question
    function showQuestion(index) {
        const question = allQuestions[index];
        questionElement.textContent = question.question;
        
        // Update category indicator
        categoryIndicator.textContent = question.categoryName;
        
        // Update question counter
        questionCounter.textContent = `Question ${index + 1} of ${allQuestions.length}`;
        
        // Update progress bar
        const progress = ((index + 1) / allQuestions.length) * 100;
        progressBar.style.width = progress + '%';
        progressBar.setAttribute('aria-valuenow', progress);
        
        // Enable/disable previous button
        previousButton.disabled = index === 0;
        
        // Update next button text
        nextButton.textContent = index === allQuestions.length - 1 ? 'See Results' : 'Next Question';
        
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
                    category: question.category,
                    reverseScored: question.reverseScored || false
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
        // Hide test UI and show results
        testUI.style.display = 'none';
        resultContainer.style.display = 'block';
        
        // Calculate Holland Code scores
        const hollandScores = {
            realistic: 0,
            investigative: 0,
            artistic: 0,
            social: 0,
            enterprising: 0,
            conventional: 0
        };
        
        // Calculate Big Five scores
        const bigFiveScores = {
            openness: 0,
            conscientiousness: 0,
            extraversion: 0,
            agreeableness: 0,
            emotional_stability: 0
        };
        
        // Count questions by category
        const hollandCounts = {
            realistic: 0,
            investigative: 0,
            artistic: 0,
            social: 0,
            enterprising: 0,
            conventional: 0
        };
        
        const bigFiveCounts = {
            openness: 0,
            conscientiousness: 0,
            extraversion: 0,
            agreeableness: 0,
            emotional_stability: 0
        };
        
        // Calculate scores for each dimension
        Object.keys(answers).forEach(id => {
            const answer = answers[id];
            let value = answer.value;
            
            // Apply reverse scoring if needed
            if (answer.reverseScored) {
                value = 6 - value; // Reverse the scale (1=5, 2=4, 3=3, 4=2, 5=1)
            }
            
            // Add to appropriate score
            if (Object.keys(hollandScores).includes(answer.category)) {
                hollandScores[answer.category] += value;
                hollandCounts[answer.category]++;
            } else if (Object.keys(bigFiveScores).includes(answer.category)) {
                bigFiveScores[answer.category] += value;
                bigFiveCounts[answer.category]++;
            }
        });
        
        // Calculate percentages
        const hollandPercentages = {};
        for (const category in hollandScores) {
            hollandPercentages[category] = (hollandScores[category] / (hollandCounts[category] * 5)) * 100;
        }
        
        const bigFivePercentages = {};
        for (const category in bigFiveScores) {
            bigFivePercentages[category] = (bigFiveScores[category] / (bigFiveCounts[category] * 5)) * 100;
        }
        
        // Display Holland Code results
        displayHollandResults(hollandPercentages);
        
        // Display Big Five results
        displayBigFiveResults(bigFivePercentages);
        
        // Display career recommendations
        displayCareerRecommendations(hollandPercentages, bigFivePercentages);
    }
    
    // Function to display Holland Code results
    function displayHollandResults(scores) {
        // Create Holland Code chart
        const hollandChartCtx = document.getElementById('holland-chart').getContext('2d');
        
        new Chart(hollandChartCtx, {
            type: 'radar',
            data: {
                labels: [
                    'Realistic (R)',
                    'Investigative (I)',
                    'Artistic (A)',
                    'Social (S)',
                    'Enterprising (E)',
                    'Conventional (C)'
                ],
                datasets: [{
                    label: 'Your Holland Code Profile',
                    data: [
                        scores.realistic,
                        scores.investigative,
                        scores.artistic,
                        scores.social,
                        scores.enterprising,
                        scores.conventional
                    ],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            beginAtZero: true,
                            stepSize: 20
                        }
                    }
                }
            }
        });
        
        // Get top three Holland types
        const hollandTypes = Object.keys(scores)
            .map(key => ({ type: key, score: scores[key] }))
            .sort((a, b) => b.score - a.score);
        
        const topHollandTypes = hollandTypes.slice(0, 3);
        
        // Determine Holland Code (e.g., "RIA" for top three types)
        const hollandCode = topHollandTypes.map(item => item.type.charAt(0).toUpperCase()).join('');
        
        // Get descriptions for Holland types
        const hollandDescriptions = {
            realistic: 'You enjoy practical, hands-on work with objects, machines, tools, plants, or animals. You prefer activities that involve physical skill, strength, or coordination.',
            investigative: 'You enjoy analyzing information, solving complex problems, and researching ideas. You thrive in fields that involve investigation, research, and intellectual curiosity.',
            artistic: 'You value creativity, self-expression, and aesthetic qualities. You prefer unstructured environments that allow for innovation and originality.',
            social: 'You enjoy working with and helping people. You excel at communication, teaching, and providing support to others.',
            enterprising: 'You enjoy leading, persuading, and managing others. You prefer roles that involve leadership, influence, and achievement of goals.',
            conventional: 'You enjoy organizing, managing data, and maintaining systems. You prefer structured environments with clear rules and procedures.'
        };
        
        // Display Holland explanation
        const hollandExplanation = document.getElementById('holland-explanation');
        hollandExplanation.innerHTML = `
            <p class="mb-3">Your Holland Code is <strong>${hollandCode}</strong>, which indicates you have strong interests in:</p>
            <ol>
                ${topHollandTypes.map(item => `
                    <li class="mb-2"><strong>${item.type.charAt(0).toUpperCase() + item.type.slice(1)}:</strong> ${hollandDescriptions[item.type]}</li>
                `).join('')}
            </ol>
            <p>People with your Holland Code typically thrive in environments that allow them to express their ${topHollandTypes[0].type} tendencies while also engaging their ${topHollandTypes[1].type} and ${topHollandTypes[2].type} interests.</p>
        `;
        
        // Display summary
        updateResultSummary(hollandCode, topHollandTypes[0].type);
    }
    
    // Function to display Big Five results
    function displayBigFiveResults(scores) {
        // Create Big Five chart
        const bigFiveChartCtx = document.getElementById('big-five-chart').getContext('2d');
        
        new Chart(bigFiveChartCtx, {
            type: 'bar',
            data: {
                labels: [
                    'Openness',
                    'Conscientiousness',
                    'Extraversion',
                    'Agreeableness',
                    'Emotional Stability'
                ],
                datasets: [{
                    label: 'Your Personality Traits',
                    data: [
                        scores.openness,
                        scores.conscientiousness,
                        scores.extraversion,
                        scores.agreeableness,
                        scores.emotional_stability
                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        });
        
        // Get descriptions for personality traits
        const traitDescriptions = {
            openness: {
                high: 'You are curious, creative, and open to new experiences. You have a rich imagination and appreciate intellectual stimulation.',
                low: 'You prefer routine, practicality, and tradition. You focus on concrete facts rather than abstract theories.'
            },
            conscientiousness: {
                high: 'You are organized, reliable, and detail-oriented. You plan ahead and strive for achievement through self-discipline.',
                low: 'You are flexible, spontaneous, and prefer to focus on the big picture rather than details.'
            },
            extraversion: {
                high: 'You are outgoing, energetic, and draw energy from social interactions. You enjoy being around others and seeking excitement.',
                low: 'You are more reserved, reflective, and prefer deeper one-on-one connections. You may need time alone to recharge.'
            },
            agreeableness: {
                high: 'You are compassionate, cooperative, and value harmony. You prioritize getting along with others and tend to be trusting.',
                low: 'You are more analytical in your approach to others, value direct communication, and may prioritize objective truth over tact.'
            },
            emotional_stability: {
                high: 'You are calm, resilient, and emotionally stable. You handle stress well and maintain a positive outlook.',
                low: 'You experience emotions intensely and may be more reactive to stress. You are sensitive to your environment.'
            }
        };
        
        // Determine high/low for each trait
        const traitLevels = {};
        for (const trait in scores) {
            traitLevels[trait] = scores[trait] >= 60 ? 'high' : 'low';
        }
        
        // Display personality explanation
        const personalityExplanation = document.getElementById('personality-explanation');
        personalityExplanation.innerHTML = `
            <p class="mb-3">Your Big Five personality profile:</p>
            <ul>
                <li class="mb-2"><strong>Openness:</strong> ${traitDescriptions.openness[traitLevels.openness]}</li>
                <li class="mb-2"><strong>Conscientiousness:</strong> ${traitDescriptions.conscientiousness[traitLevels.conscientiousness]}</li>
                <li class="mb-2"><strong>Extraversion:</strong> ${traitDescriptions.extraversion[traitLevels.extraversion]}</li>
                <li class="mb-2"><strong>Agreeableness:</strong> ${traitDescriptions.agreeableness[traitLevels.agreeableness]}</li>
                <li class="mb-2"><strong>Emotional Stability:</strong> ${traitDescriptions.emotional_stability[traitLevels.emotional_stability]}</li>
            </ul>
        `;
    }
    
    // Function to update result summary
    function updateResultSummary(hollandCode, primaryType) {
        const resultSummary = document.getElementById('result-summary');
        
        const typeDescriptions = {
            realistic: 'practical and hands-on approach',
            investigative: 'analytical and research-oriented mindset',
            artistic: 'creative and innovative thinking',
            social: 'supportive and people-focused style',
            enterprising: 'leadership and persuasive abilities',
            conventional: 'organized and detail-oriented nature'
        };
        
        resultSummary.innerHTML = `
            <p class="lead">Based on your responses, your Holland Code is <strong>${hollandCode}</strong>.</p>
            <p>Your strongest career interest is in the <strong>${primaryType.charAt(0).toUpperCase() + primaryType.slice(1)}</strong> area, 
            which suggests you thrive when using your ${typeDescriptions[primaryType]}.</p>
            <p>Explore the detailed results below to discover career paths that align with your unique combination of interests and personality traits.</p>
        `;
    }
    
    // Function to display career recommendations
    function displayCareerRecommendations(hollandScores, personalityScores) {
        // Get top Holland types
        const hollandTypes = Object.keys(hollandScores)
            .map(key => ({ type: key, score: hollandScores[key] }))
            .sort((a, b) => b.score - a.score);
        
        const primaryType = hollandTypes[0].type;
        const secondaryType = hollandTypes[1].type;
        
        // Define career recommendations
        const careerRecommendations = {
            realistic: {
                engineering: {
                    title: 'Engineering & Technical Roles',
                    description: 'These roles involve designing, building, and maintaining systems, structures, and products.',
                    careers: ['Mechanical Engineer', 'Civil Engineer', 'Electrical Technician', 'Construction Manager'],
                    match: 95
                },
                trades: {
                    title: 'Skilled Trades',
                    description: 'These hands-on careers involve specialized technical skills and practical problem-solving.',
                    careers: ['Electrician', 'Carpenter', 'Plumber', 'HVAC Technician'],
                    match: 90
                },
                agriculture: {
                    title: 'Agriculture & Natural Resources',
                    description: 'Careers focused on working with plants, animals, and natural resources.',
                    careers: ['Agriculture Manager', 'Forest Ranger', 'Landscape Designer', 'Environmental Technician'],
                    match: 85
                }
            },
            investigative: {
                science: {
                    title: 'Scientific Research',
                    description: 'Careers focused on discovery, analysis, and advancing knowledge through systematic inquiry.',
                    careers: ['Research Scientist', 'Biochemist', 'Medical Researcher', 'Data Scientist'],
                    match: 95
                },
                medicine: {
                    title: 'Medical & Health Sciences',
                    description: 'Professions devoted to treating illness, promoting health, and advancing medical knowledge.',
                    careers: ['Physician', 'Pharmacist', 'Medical Laboratory Scientist', 'Epidemiologist'],
                    match: 90
                },
                technology: {
                    title: 'Information Technology',
                    description: 'Careers focused on developing, implementing, and maintaining technology systems.',
                    careers: ['Software Developer', 'Systems Analyst', 'Network Architect', 'Database Administrator'],
                    match: 85
                }
            },
            artistic: {
                design: {
                    title: 'Design & Visual Arts',
                    description: 'Careers centered on creating aesthetically pleasing and functional designs.',
                    careers: ['Graphic Designer', 'Interior Designer', 'User Experience (UX) Designer', 'Fashion Designer'],
                    match: 95
                },
                media: {
                    title: 'Media & Entertainment',
                    description: 'Professions that involve creating content for entertainment, information, or artistic expression.',
                    careers: ['Film Director', 'Writer', 'Animator', 'Photographer'],
                    match: 90
                },
                performing: {
                    title: 'Performing Arts',
                    description: 'Careers focused on live performance and artistic expression.',
                    careers: ['Actor', 'Musician', 'Dancer', 'Theater Director'],
                    match: 85
                }
            },
            social: {
                education: {
                    title: 'Education & Training',
                    description: 'Careers devoted to helping others learn and develop their knowledge and skills.',
                    careers: ['Teacher', 'School Counselor', 'Training Specialist', 'Educational Administrator'],
                    match: 95
                },
                healthcare: {
                    title: 'Healthcare & Counseling',
                    description: 'Professions focused on supporting the physical and mental well-being of others.',
                    careers: ['Nurse', 'Therapist', 'Social Worker', 'Occupational Therapist'],
                    match: 90
                },
                community: {
                    title: 'Community & Social Services',
                    description: 'Careers centered on supporting communities and addressing social needs.',
                    careers: ['Community Organizer', 'Non-profit Program Manager', 'Human Services Worker', 'Career Counselor'],
                    match: 85
                }
            },
            enterprising: {
                business: {
                    title: 'Business Leadership',
                    description: 'Roles focused on leading organizations, making strategic decisions, and driving growth.',
                    careers: ['Executive', 'Business Development Manager', 'Entrepreneur', 'Management Consultant'],
                    match: 95
                },
                sales: {
                    title: 'Sales & Marketing',
                    description: 'Careers centered on promoting products/services and generating revenue.',
                    careers: ['Sales Manager', 'Marketing Director', 'Public Relations Specialist', 'Advertising Executive'],
                    match: 90
                },
                law: {
                    title: 'Legal & Finance',
                    description: 'Professions involving legal advocacy, financial management, and strategic planning.',
                    careers: ['Lawyer', 'Financial Advisor', 'Investment Banker', 'Real Estate Developer'],
                    match: 85
                }
            },
            conventional: {
                finance: {
                    title: 'Finance & Accounting',
                    description: 'Careers focused on managing financial resources, maintaining records, and ensuring compliance.',
                    careers: ['Accountant', 'Financial Analyst', 'Auditor', 'Budget Analyst'],
                    match: 95
                },
                admin: {
                    title: 'Administration & Operations',
                    description: 'Roles that keep organizations running efficiently through careful management of processes and resources.',
                    careers: ['Operations Manager', 'Administrative Director', 'Logistics Coordinator', 'Project Manager'],
                    match: 90
                },
                data: {
                    title: 'Data Management & Analysis',
                    description: 'Careers centered on organizing, maintaining, and analyzing information.',
                    careers: ['Data Analyst', 'Health Information Technician', 'Quality Assurance Specialist', 'Market Research Analyst'],
                    match: 85
                }
            }
        };
        
        // Select career fields based on top Holland types
        let recommendedFields = [];
        
        // Add primary interest fields
        for (const field in careerRecommendations[primaryType]) {
            recommendedFields.push({
                ...careerRecommendations[primaryType][field],
                primaryType: primaryType
            });
        }
        
        // Add secondary interest fields (limit to top 2)
        for (const field in careerRecommendations[secondaryType]) {
            const adjustedMatch = careerRecommendations[secondaryType][field].match - 15; // Reduce match score for secondary
            recommendedFields.push({
                ...careerRecommendations[secondaryType][field],
                match: adjustedMatch,
                primaryType: secondaryType
            });
        }
        
        // Sort by match score and take top 6
        recommendedFields.sort((a, b) => b.match - a.match);
        recommendedFields = recommendedFields.slice(0, 6);
        
        // Display career recommendations
        const careerRecommendationsContainer = document.getElementById('career-recommendations');
        careerRecommendationsContainer.innerHTML = recommendedFields.map(field => `
            <div class="col-md-4 mb-4">
                <div class="card career-card">
                    <div class="card-body">
                        <span class="career-match">${field.match}% Match</span>
                        <h5 class="card-title">${field.title}</h5>
                        <p class="card-text text-muted small">${field.description}</p>
                        <h6 class="mt-3 mb-2">Sample Careers:</h6>
                        <ul class="small">
                            ${field.careers.map(career => `<li>${career}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="card-footer bg-light">
                        <small class="text-muted">Based on your ${field.primaryType.charAt(0).toUpperCase() + field.primaryType.slice(1)} interests</small>
                    </div>
                </div>
            </div>
        `).join('');
    }
}); 