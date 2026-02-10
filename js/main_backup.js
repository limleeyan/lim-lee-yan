/* =====================================================
   Digital Marketing Portfolio - JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavigation();
    initScrollEffects();
    initContactForm();
});

/* =====================================================
   Navigation
   ===================================================== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/* =====================================================
   Smooth Scroll
   ===================================================== */
function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* =====================================================
   Contact Form
   ===================================================== */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            console.log('Form submitted:', data);

            // Show success message
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            // Reset form
            contactForm.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
            }, 3000);
        });
    }

    // Newsletter form
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            const email = input.value;
            
            console.log('Newsletter subscription:', email);
            
            // Show success feedback
            input.value = 'Subscribed!';
            setTimeout(() => {
                input.value = '';
            }, 2000);
        });
    });
}

/* =====================================================
   Skill Bars Animation
   ===================================================== */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.width = `${progress}%`;
                observer.unobserve(progressBar);
            }
        });
    };

    const observer = new IntersectionObserver(animateSkillBars, {
        threshold: 0.5,
        rootMargin: '0px'
    });

    skillBars.forEach(bar => observer.observe(bar));
}

/* =====================================================
   Scroll Animations
   ===================================================== */
function initScrollAnimations() {
    // Add fade-in class to elements
    const animatedElements = document.querySelectorAll(
        '.service-card, .portfolio-item, .skill-item, .about-content, .contact-content'
    );

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });

    // Intersection Observer for animations
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => scrollObserver.observe(el));

    // Stagger animation for grid items
    const gridContainers = document.querySelectorAll('.services-grid, .portfolio-grid, .tools-grid');
    
    gridContainers.forEach(container => {
        const items = container.children;
        Array.from(items).forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });
}

/* =====================================================
   Counter Animation (for stats)
   ===================================================== */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Initialize counter animation when stats are visible
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.textContent);
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

/* =====================================================
   Typing Effect (Optional Enhancement)
   ===================================================== */
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

/* =====================================================
   Parallax Effect (Optional Enhancement)
   ===================================================== */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

/* =====================================================
   Preloader (Optional)
   ===================================================== */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
