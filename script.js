// ==================== DOM Elements ====================
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('menuToggle');
const themeToggle = document.getElementById('themeToggle');
const loadingScreen = document.getElementById('loadingScreen');
const body = document.body;
const appointmentBtn = document.getElementById('appointmentBtn');
const heroAppointmentBtn = document.getElementById('heroAppointmentBtn');
const appointmentModal = document.getElementById('appointmentModal');
const modalClose = document.getElementById('modalClose');
const appointmentForm = document.getElementById('appointmentForm');
const modalAppointmentForm = document.getElementById('modalAppointmentForm');
const contactForm = document.getElementById('contactForm');
const faqItems = document.querySelectorAll('.faq-item');
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbot = document.getElementById('chatbot');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');
const counters = document.querySelectorAll('.counter');
const learnMoreBtn = document.getElementById('learnMoreBtn');

// ==================== Theme Toggle ====================
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// ==================== Loading Screen ====================
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 2500);
});

// ==================== Mobile Menu Toggle ====================
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ==================== Sticky Navbar ====================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = '10px 0';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.padding = '15px 0';
    }

    updateActiveNavLink();
    updateScrollProgress();
});

// ==================== Active Navigation Link ====================
function updateActiveNavLink() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// Add active class styling in CSS or here
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Smooth Scrolling ====================
learnMoreBtn.addEventListener('click', () => {
    const servicesSection = document.getElementById('services');
    window.scrollTo({
        top: servicesSection.offsetTop - 80,
        behavior: 'smooth'
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== FAQ Accordion ====================
faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    
    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });
        
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ==================== Appointment Form Validation ====================
function validateAppointmentForm(formData) {
    const errors = [];
    
    if (!formData.patientName || formData.patientName.trim().length < 2) {
        errors.push('Please enter a valid name');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.patientEmail)) {
        errors.push('Please enter a valid email address');
    }
    
    const phoneRegex = /^[0-9\-\+\(\)\s]{10,}$/;
    if (!phoneRegex.test(formData.patientPhone)) {
        errors.push('Please enter a valid phone number');
    }
    
    if (!formData.department) {
        errors.push('Please select a department');
    }
    
    if (!formData.appointmentDate) {
        errors.push('Please select a date');
    }
    
    if (!formData.appointmentTime) {
        errors.push('Please select a time');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// ==================== Appointment Form Submission ====================
appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        patientName: document.getElementById('patientName').value,
        patientEmail: document.getElementById('patientEmail').value,
        patientPhone: document.getElementById('patientPhone').value,
        department: document.getElementById('departmentSelect').value,
        appointmentDate: document.getElementById('appointmentDate').value,
        appointmentTime: document.getElementById('appointmentTime').value,
        message: document.getElementById('appointmentMessage').value,
        agreeTerms: document.getElementById('agreeTerms').checked
    };
    
    const validation = validateAppointmentForm(formData);
    
    if (validation.isValid && formData.agreeTerms) {
        showSuccessPopup('Appointment Confirmed!', 'Your appointment has been successfully booked. You will receive a confirmation email shortly.');
        appointmentForm.reset();
    } else {
        if (!formData.agreeTerms) {
            validation.errors.push('Please agree to the terms and conditions');
        }
        showErrorPopup(validation.errors.join('\n'));
    }
});

// Modal Appointment Form
document.getElementById('appointmentBtn').addEventListener('click', openAppointmentModal);
document.getElementById('heroAppointmentBtn').addEventListener('click', openAppointmentModal);

function openAppointmentModal() {
    appointmentModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

modalClose.addEventListener('click', closeAppointmentModal);

function closeAppointmentModal() {
    appointmentModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

appointmentModal.addEventListener('click', (e) => {
    if (e.target === appointmentModal) {
        closeAppointmentModal();
    }
});

modalAppointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        patientName: document.getElementById('modalPatientName').value,
        patientEmail: document.getElementById('modalPatientEmail').value,
        patientPhone: document.getElementById('modalPatientPhone').value,
        department: document.getElementById('modalDepartmentSelect').value,
        appointmentDate: document.getElementById('modalAppointmentDate').value,
        appointmentTime: document.getElementById('modalAppointmentTime').value
    };
    
    const validation = validateAppointmentForm(formData);
    
    if (validation.isValid) {
        showSuccessPopup('Appointment Confirmed!', 'Your appointment has been successfully booked. You will receive a confirmation email shortly.');
        closeAppointmentModal();
        modalAppointmentForm.reset();
    } else {
        showErrorPopup(validation.errors.join('\n'));
    }
});

// ==================== Success Popup ====================
function showSuccessPopup(title, message) {
    const popup = document.createElement('div');
    popup.className = 'popup success-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>${title}</h3>
            <p>${message}</p>
            <button class="popup-close">Close</button>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.classList.add('active');
    }, 10);
    
    const closeBtn = popup.querySelector('.popup-close');
    closeBtn.addEventListener('click', () => {
        popup.classList.remove('active');
        setTimeout(() => {
            popup.remove();
        }, 300);
    });
    
    setTimeout(() => {
        if (document.body.contains(popup)) {
            popup.classList.remove('active');
            setTimeout(() => {
                popup.remove();
            }, 300);
        }
    }, 4000);
}

function showErrorPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup error-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-icon">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <h3>Error</h3>
            <p>${message}</p>
            <button class="popup-close">Close</button>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.classList.add('active');
    }, 10);
    
    const closeBtn = popup.querySelector('.popup-close');
    closeBtn.addEventListener('click', () => {
        popup.classList.remove('active');
        setTimeout(() => {
            popup.remove();
        }, 300);
    });
}

// Add popup styles
const popupStyles = document.createElement('style');
popupStyles.innerHTML = `
    .popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.7);
        opacity: 0;
        z-index: 3000;
        transition: all 0.3s ease;
    }
    
    .popup.active {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
    
    .popup-content {
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        min-width: 400px;
    }
    
    body.dark-mode .popup-content {
        background: #1e293b;
        color: #f1f5f9;
    }
    
    .popup-icon {
        font-size: 60px;
        margin-bottom: 20px;
    }
    
    .success-popup .popup-icon {
        color: #10b981;
    }
    
    .error-popup .popup-icon {
        color: #ef4444;
    }
    
    .popup-content h3 {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 10px;
    }
    
    .popup-content p {
        color: #64748b;
        margin-bottom: 25px;
        white-space: pre-line;
    }
    
    body.dark-mode .popup-content p {
        color: #cbd5e1;
    }
    
    .popup-close {
        padding: 12px 30px;
        background: linear-gradient(135deg, #6366f1, #ec4899);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .popup-close:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
    }
`;
document.head.appendChild(popupStyles);

// ==================== Contact Form Submission ====================
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const contactData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value
    };
    
    if (contactData.name && contactData.email && contactData.subject && contactData.message) {
        showSuccessPopup('Message Sent!', 'Thank you for contacting us. We will get back to you as soon as possible.');
        contactForm.reset();
    } else {
        showErrorPopup('Please fill in all required fields.');
    }
});

// ==================== Animated Number Counters ====================
function animateCounters() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.floor(current).toLocaleString();
                        setTimeout(updateCounter, 30);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    counters.forEach(counter => observer.observe(counter));
}

// Call animation when page loads
window.addEventListener('load', animateCounters);

// ==================== Back to Top Button ====================
const backToTopBtn = document.createElement('button');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopBtn);

const backToTopStyles = document.createElement('style');
backToTopStyles.innerHTML = `
    .back-to-top {
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #6366f1, #ec4899);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 18px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 400;
        box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
    }
    
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .back-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 35px rgba(99, 102, 241, 0.4);
    }
`;
document.head.appendChild(backToTopStyles);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== Scroll Progress Bar ====================
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress-bar';
document.body.appendChild(progressBar);

const progressBarStyles = document.createElement('style');
progressBarStyles.innerHTML = `
    .scroll-progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #6366f1, #ec4899, #06b6d4);
        width: 0%;
        z-index: 1001;
        transition: width 0.2s ease;
    }
`;
document.head.appendChild(progressBarStyles);

function updateScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
}

// ==================== Chatbot ====================
const predefinedResponses = {
    'hello': 'Hello! Welcome to Premium Clinic. How can I assist you today?',
    'hi': 'Hello! Welcome to Premium Clinic. How can I assist you today?',
    'appointment': 'You can book an appointment through our online form on this page or call us at +91 98765 43210. Would you like help with anything else?',
    'hours': 'We are open Monday to Saturday from 9:00 AM to 8:00 PM, and Sunday from 10:00 AM to 6:00 PM. Emergency services are available 24/7.',
    'contact': 'You can reach us at +91 98765 43210 or email us at info@premiumclinic.com. Our address is 123 Medical Plaza, Healthcare Avenue, New Delhi.',
    'services': 'We offer services including General Consultation, Cardiology, Neurology, Dental Care, Ophthalmology, and Pediatrics. Which service interests you?',
    'insurance': 'We accept all major health insurance plans. Please contact us to confirm your specific plan coverage.',
    'thank you': 'You\'re welcome! Is there anything else I can help you with?',
    'thanks': 'You\'re welcome! Is there anything else I can help you with?',
    'bye': 'Thank you for contacting Premium Clinic. Have a great day!',
    'goodbye': 'Thank you for contacting Premium Clinic. Have a great day!'
};

chatbotToggle.addEventListener('click', () => {
    chatbot.classList.toggle('active');
    if (chatbot.classList.contains('active')) {
        chatbotInput.focus();
    }
});

chatbotClose.addEventListener('click', () => {
    chatbot.classList.remove('active');
});

function addBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    
    return 'Thank you for your message. For detailed assistance, please call us at +91 98765 43210 or visit our clinic. Is there anything else I can help you with?';
}

function sendChatbotMessage() {
    const message = chatbotInput.value.trim();
    
    if (message) {
        addUserMessage(message);
        chatbotInput.value = '';
        
        setTimeout(() => {
            const response = getBotResponse(message);
            addBotMessage(response);
        }, 500);
    }
}

chatbotSend.addEventListener('click', sendChatbotMessage);

chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendChatbotMessage();
    }
});

// ==================== Swiper Initialization ====================
if (typeof Swiper !== 'undefined') {
    const swiper = new Swiper('.testimonialSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop: true,
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 2,
            }
        }
    });
}

// ==================== Initialize Theme ====================
initTheme();

// ==================== Prevent Animation on Page Load ====================
window.addEventListener('beforeunload', () => {
    document.documentElement.style.scrollBehavior = 'auto';
});