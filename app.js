// Application data
const projectsData = [
    {
        id: 1,
        title: "Sistema de E-commerce",
        description: "Plataforma completa de e-commerce com React.js, Node.js e PostgreSQL",
        image: "placeholder-ecommerce.jpg",
        technologies: ["React.js", "Node.js", "PostgreSQL", "Docker"],
        category: "fullstack",
        github: "#",
        live: "#"
    },
    {
        id: 2,
        title: "Análise Preditiva de Vendas",
        description: "Sistema de machine learning para previsão de vendas usando Python e scikit-learn",
        image: "placeholder-ml.jpg",
        technologies: ["Python", "scikit-learn", "Pandas", "Matplotlib"],
        category: "datascience",
        github: "#",
        live: "#"
    },
    {
        id: 3,
        title: "Dashboard Analytics",
        description: "Dashboard interativo para visualização de dados em tempo real",
        image: "placeholder-dashboard.jpg",
        technologies: ["React.js", "D3.js", "Node.js", "MongoDB"],
        category: "fullstack",
        github: "#",
        live: "#"
    },
    {
        id: 4,
        title: "Sistema de Recomendação",
        description: "Engine de recomendação usando algoritmos de deep learning",
        image: "placeholder-ai.jpg",
        technologies: ["Python", "TensorFlow", "Keras", "Docker"],
        category: "datascience",
        github: "#",
        live: "#"
    }
];

const skillsData = {
    frontend: ["React.js", "Vue.js", "TypeScript", "HTML/CSS", "Tailwind CSS"],
    backend: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs"],
    datascience: ["Python", "Pandas", "NumPy", "scikit-learn", "TensorFlow"],
    devops: ["Docker", "AWS", "Git", "Linux", "CI/CD"]
};

// DOM elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const projectsGrid = document.getElementById('projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contact-form');
const navLinks = document.querySelectorAll('.nav__link');

// Mobile navigation toggle
function initMobileNav() {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            navToggle.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Generate project icon based on category
function getProjectIcon(category) {
    const icons = {
        fullstack: '🌐',
        datascience: '📊',
        default: '💻'
    };
    return icons[category] || icons.default;
}

// Render projects
function renderProjects(projects = projectsData) {
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card" data-category="${project.category}">
            <div class="project-card__image">
                ${getProjectIcon(project.category)}
            </div>
            <div class="project-card__content">
                <h3 class="project-card__title">${project.title}</h3>
                <p class="project-card__description">${project.description}</p>
                <div class="project-card__technologies">
                    ${project.technologies.map(tech => `
                        <span class="tech-tag">${tech}</span>
                    `).join('')}
                </div>
                <div class="project-card__links">
                    <a href="${project.github}" class="project-link" target="_blank">GitHub</a>
                    <a href="${project.live}" class="project-link" target="_blank">Ver Demo</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter projects
function initProjectFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Render skills
function renderSkills() {
    Object.keys(skillsData).forEach(category => {
        const skillsContainer = document.getElementById(`${category}-skills`);
        if (skillsContainer) {
            skillsContainer.innerHTML = skillsData[category].map(skill => `
                <span class="skill-tag">${skill}</span>
            `).join('');
        }
    });
}

// Handle contact form
function initContactForm() {
    // Initialize EmailJS with your public key
    emailjs.init('SUA_PUBLIC_KEY_AQUI'); // Substitua com sua Public Key
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Send email using EmailJS
        emailjs.send('SUA_SERVICE_ID_AQUI', 'SUA_TEMPLATE_ID_AQUI', {
            from_name: data.name,
            from_email: data.email,
            message: data.message,
            to_email: 'SEU_EMAIL_AQUI'
        })
        .then((response) => {
            alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        })
        .catch((error) => {
            console.error('Erro ao enviar email:', error);
            alert('Erro ao enviar mensagem. Tente novamente mais tarde.');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    });
}

// Header scroll effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.9)';
        }
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe skill categories
    const skillCategories = document.querySelectorAll('.skills__category');
    skillCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        category.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(category);
    });
}

// Active navigation link highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    });
}

// Add typing effect to hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero__title');
    const text = heroTitle.innerHTML;
    const words = text.split(' ');
    
    // Don't modify if already processed or no gradient text found
    if (heroTitle.classList.contains('typed') || !text.includes('gradient-text')) {
        return;
    }
    
    heroTitle.classList.add('typed');
    
    // Add subtle fade-in animation instead
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 500);
}

// Add scroll-to-top functionality
function initScrollToTop() {
    // Create scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--color-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    scrollButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    initMobileNav();
    initSmoothScrolling();
    renderProjects();
    renderSkills();
    initProjectFilters();
    initContactForm();
    
    // Enhanced UI features
    initHeaderScrollEffect();
    initActiveNavigation();
    initTypingEffect();
    initScrollToTop();
    
    // Initialize animations with delay to ensure content is rendered
    setTimeout(() => {
        initScrollAnimations();
    }, 100);
    
    console.log('Portfolio application initialized successfully!');
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize to larger screen
    if (window.innerWidth > 768) {
        navMenu.classList.remove('show');
        navToggle.classList.remove('active');
    }
});

// Add some global utility functions
window.portfolioApp = {
    // Function to programmatically navigate to section
    navigateToSection: (sectionId) => {
        const section = document.querySelector(sectionId);
        if (section) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = section.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },
    
    // Function to filter projects programmatically
    filterProjects: (category) => {
        const button = document.querySelector(`[data-filter="${category}"]`);
        if (button) {
            button.click();
        }
    },
    
    // Function to get current active section
    getCurrentSection: () => {
        const scrollPos = window.scrollY + 100;
        const sections = document.querySelectorAll('section[id]');
        
        for (let section of sections) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                return section.getAttribute('id');
            }
        }
        return null;
    }
};