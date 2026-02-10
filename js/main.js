/* =====================================================
   Digital Marketing Portfolio - JavaScript
   Modern Clean Design
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavigation();
    initScrollEffects();
    initScrollAnimations();
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
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
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
            
            if (targetId === '#') return;
            
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
   Scroll Animations
   ===================================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.project-card, .skill-card, .timeline-item');
    
    const animateOnScroll = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };

    const scrollObserver = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(el);
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
            
            submitBtn.textContent = 'Message Sent! ✓';
            submitBtn.style.background = '#10b981';
            
            // Reset form
            contactForm.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
            }, 3000);
        });
    }
}

/* =====================================================
   Back to Top Button
   ===================================================== */
const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
