gsap.registerPlugin(ScrollTrigger);

// ==================== Hero Animation ====================
function initHeroAnimation() {
    const tl = gsap.timeline();
    
    tl.from('.hero-content h1', {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: 'power3.out'
    }, 2.5)
    .from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out'
    }, 2.7)
    .from('.hero-buttons', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out'
    }, 2.9)
    .from('.hero-features', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out'
    }, 3.1)
    .from('.hero-img', {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
    }, 2.6);
}

window.addEventListener('load', () => {
    setTimeout(() => {
        initHeroAnimation();
    }, 300);
});

// ==================== Statistics Counter Animation ====================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach((counter) => {
        ScrollTrigger.create({
            trigger: counter,
            onEnter: () => {
                const target = parseInt(counter.getAttribute('data-target'));
                gsap.to(counter, {
                    textContent: target,
                    duration: 2.5,
                    snap: { textContent: 1 },
                    ease: 'power3.out'
                });
            },
            once: true
        });
    });
}

initCounterAnimation();

// ==================== Statistics Section Animation ====================
function initStatisticsAnimation() {
    const statCards = gsap.utils.toArray('.stat-card');
    
    gsap.to(statCards, {
        scrollTrigger: {
            trigger: '.statistics',
            start: 'top 70%',
            once: true
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out'
    });
}

gsap.set('.stat-card', { opacity: 0, y: 40 });
initStatisticsAnimation();

// ==================== Services Cards Stagger Animation ====================
function initServicesAnimation() {
    const serviceCards = gsap.utils.toArray('.service-card');
    
    gsap.to(serviceCards, {
        scrollTrigger: {
            trigger: '.services',
            start: 'top 70%',
            once: true
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
    });
}

gsap.set('.service-card', { opacity: 0, y: 50 });
initServicesAnimation();

// ==================== Gallery Reveal Animation ====================
function initGalleryAnimation() {
    const galleryItems = gsap.utils.toArray('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        ScrollTrigger.create({
            trigger: item,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(item, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: 'back.out'
                });
            },
            once: true
        });
    });
}

gsap.set('.gallery-item', { opacity: 0, scale: 0.85 });
initGalleryAnimation();

// ==================== Testimonials Animation ====================
function initTestimonialsAnimation() {
    const testimonialCards = gsap.utils.toArray('.testimonial-card');
    
    gsap.to(testimonialCards, {
        scrollTrigger: {
            trigger: '.testimonials',
            start: 'top 70%',
            once: true
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out'
    });
}

gsap.set('.testimonial-card', { opacity: 0, y: 40 });
initTestimonialsAnimation();

// ==================== FAQ Items Animation ====================
function initFAQAnimation() {
    const faqItems = gsap.utils.toArray('.faq-item');
    
    gsap.to(faqItems, {
        scrollTrigger: {
            trigger: '.faq',
            start: 'top 70%',
            once: true
        },
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out'
    });
}

gsap.set('.faq-item', { opacity: 0, x: -30 });
initFAQAnimation();

// ==================== Contact Section Animation ====================
function initContactAnimation() {
    const contactForm = document.querySelector('.contact-form');
    const contactInfo = document.querySelector('.contact-info');
    const infoCards = gsap.utils.toArray('.info-card');
    
    ScrollTrigger.create({
        trigger: '.contact',
        start: 'top 70%',
        onEnter: () => {
            gsap.to(contactForm, {
                opacity: 1,
                x: 0,
                duration: 0.7,
                ease: 'power3.out'
            });
            
            gsap.to(contactInfo, {
                opacity: 1,
                x: 0,
                duration: 0.7,
                delay: 0.1,
                ease: 'power3.out'
            });
            
            gsap.to(infoCards, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.08,
                delay: 0.2,
                ease: 'power2.out'
            });
        },
        once: true
    });
}

gsap.set('.contact-form', { opacity: 0, x: -50 });
gsap.set('.contact-info', { opacity: 0, x: 50 });
gsap.set('.info-card', { opacity: 0, y: 30 });
initContactAnimation();

// ==================== Footer Animation ====================
function initFooterAnimation() {
    const footerSections = gsap.utils.toArray('.footer-section');
    
    gsap.to(footerSections, {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 80%',
            once: true
        },
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out'
    });
}

gsap.set('.footer-section', { opacity: 0, y: 30 });
initFooterAnimation();

// ==================== Section Titles Animation ====================
function initTitlesAnimation() {
    const titles = gsap.utils.toArray('.section-title');
    const subtitles = gsap.utils.toArray('.section-subtitle');
    
    titles.forEach((title) => {
        ScrollTrigger.create({
            trigger: title,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(title, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                });
            },
            once: true
        });
    });
    
    subtitles.forEach((subtitle) => {
        ScrollTrigger.create({
            trigger: subtitle,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(subtitle, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: 0.1,
                    ease: 'power2.out'
                });
            },
            once: true
        });
    });
}

gsap.set('.section-title', { opacity: 0, y: 30 });
gsap.set('.section-subtitle', { opacity: 0, y: 20 });
initTitlesAnimation();

// ==================== Button Hover Animation ====================
function initButtonAnimation() {
    const buttons = gsap.utils.toArray('.btn');
    
    buttons.forEach((btn) => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                scale: 1.05,
                duration: 0.3,
                overwrite: 'auto'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                scale: 1,
                duration: 0.3,
                overwrite: 'auto'
            });
        });
    });
}

initButtonAnimation();

// ==================== Stat Card Hover Animation ====================
function initStatCardHover() {
    const statCards = gsap.utils.toArray('.stat-card');
    
    statCards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                overwrite: 'auto'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                overwrite: 'auto'
            });
        });
    });
}

initStatCardHover();

// ==================== Service Card Hover Animation ====================
function initServiceCardHover() {
    const serviceCards = gsap.utils.toArray('.service-card');
    
    serviceCards.forEach((card) => {
        const icon = card.querySelector('.service-icon');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -8,
                duration: 0.3,
                overwrite: 'auto'
            });
            
            if (icon) {
                gsap.to(icon, {
                    scale: 1.15,
                    duration: 0.3,
                    overwrite: 'auto'
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                overwrite: 'auto'
            });
            
            if (icon) {
                gsap.to(icon, {
                    scale: 1,
                    duration: 0.3,
                    overwrite: 'auto'
                });
            }
        });
    });
}

initServiceCardHover();

// ==================== Gallery Overlay Animation ====================
function initGalleryOverlay() {
    const galleryItems = gsap.utils.toArray('.gallery-item');
    
    galleryItems.forEach((item) => {
        const overlay = item.querySelector('.gallery-overlay');
        const info = item.querySelector('.gallery-info');
        
        if (overlay && info) {
            gsap.set([overlay, info], { opacity: 0 });
            
            item.addEventListener('mouseenter', () => {
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 0.3
                });
                
                gsap.to(info, {
                    opacity: 1,
                    duration: 0.3,
                    delay: 0.1
                });
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(overlay, {
                    opacity: 0,
                    duration: 0.3
                });
                
                gsap.to(info, {
                    opacity: 0,
                    duration: 0.2
                });
            });
        }
    });
}

initGalleryOverlay();

// ==================== Floating Animation ====================
function initFloatingAnimation() {
    const statCards = gsap.utils.toArray('.stat-card');
    
    statCards.forEach((card, index) => {
        gsap.to(card, {
            y: -15,
            duration: 3 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
    
    const serviceCards = gsap.utils.toArray('.service-card');
    
    serviceCards.forEach((card, index) => {
        gsap.to(card, {
            y: -10,
            duration: 3.5 + index * 0.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
}

initFloatingAnimation();

// ==================== Navbar Animations ====================
function initNavbarAnimation() {
    const navLinks = gsap.utils.toArray('.nav-link');
    
    navLinks.forEach((link) => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                color: 'var(--primary-color)',
                duration: 0.2
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                color: 'var(--text-dark)',
                duration: 0.2
            });
        });
    });
}

initNavbarAnimation();

// ==================== Appointment Section Animation ====================
function initAppointmentAnimation() {
    const appointmentForm = document.querySelector('.appointment-form');
    const appointmentInfo = document.querySelector('.appointment-info');
    
    if (appointmentForm && appointmentInfo) {
        ScrollTrigger.create({
            trigger: '.appointment-section',
            start: 'top 70%',
            onEnter: () => {
                gsap.to(appointmentForm, {
                    opacity: 1,
                    x: 0,
                    duration: 0.7,
                    ease: 'power3.out'
                });
                
                gsap.to(appointmentInfo, {
                    opacity: 1,
                    x: 0,
                    duration: 0.7,
                    delay: 0.1,
                    ease: 'power3.out'
                });
            },
            once: true
        });
    }
}

gsap.set('.appointment-form', { opacity: 0, x: -50 });
gsap.set('.appointment-info', { opacity: 0, x: 50 });
initAppointmentAnimation();

// ==================== Refresh on Resize ====================
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// ==================== Initialize ScrollTrigger ====================
ScrollTrigger.refresh();