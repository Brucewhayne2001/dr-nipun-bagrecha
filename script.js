// ============================================
// Dr. Nipun Bagrecha - Website JavaScript
// ============================================

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form Submission Handler
const appointmentForm = document.getElementById('appointmentForm');

appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    // Basic validation
    if (!name || !phone || !date || !service) {
        alert('Please fill in all required fields');
        return;
    }

    // Phone number validation (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid 10-digit Indian mobile number');
        return;
    }

    // Date validation (should be today or future date)
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        alert('Please select today or a future date');
        return;
    }

    // Create appointment details
    const appointmentDetails = `
📋 NEW APPOINTMENT REQUEST

👤 Name: ${name}
📞 Phone: ${phone}
📧 Email: ${email || 'Not provided'}
📅 Date: ${date}
🏥 Service: ${service}
💬 Message: ${message || 'None'}
    `;

    // Show success message
    alert(`Thank you ${name}! Your appointment request has been received.\n\nWe will contact you at ${phone} within 24 hours to confirm your appointment.`);

    // Log appointment details (in real implementation, this would be sent to a server)
    console.log(appointmentDetails);

    // Reset form
    appointmentForm.reset();

    // Optional: Send to WhatsApp (uncomment to enable)
    // const whatsappNumber = '919029059702'; // Replace with actual number
    // const whatsappMessage = encodeURIComponent(`New Appointment Request\n\nName: ${name}\nPhone: ${phone}\nDate: ${date}\nService: ${service}`);
    // window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
});

// Animate elements on scroll
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

// Observe all service cards, review cards, and info items
document.querySelectorAll('.service-card, .review-card, .info-item, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add active class to nav links based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Prevent date selection in the past
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Add loading animation to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function() {
        if (this.type !== 'submit') return;

        this.classList.add('loading');
        setTimeout(() => {
            this.classList.remove('loading');
        }, 2000);
    });
});

// Emergency call functionality
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.confirm('Do you want to call Dr. Nipun Bagrecha?')) {
            // Continue with the call
        } else {
            e.preventDefault();
        }
    });
});

// Print consultation details
function printAppointmentDetails() {
    window.print();
}

// Copy phone number to clipboard
document.querySelectorAll('.contact-card a[href^="tel:"]').forEach(link => {
    const copyIcon = document.createElement('i');
    copyIcon.className = 'fas fa-copy';
    copyIcon.style.marginLeft = '10px';
    copyIcon.style.cursor = 'pointer';
    copyIcon.title = 'Copy to clipboard';

    copyIcon.addEventListener('click', (e) => {
        e.preventDefault();
        const phoneNumber = link.textContent;
        navigator.clipboard.writeText(phoneNumber).then(() => {
            alert(`Phone number ${phoneNumber} copied to clipboard!`);
        });
    });

    link.parentNode.appendChild(copyIcon);
});

// Console welcome message
console.log('%c👋 Welcome to Dr. Nipun Bagrecha's Website!', 'color: #2563eb; font-size: 18px; font-weight: bold;');
console.log('%cFor appointments, call: +91 90290 59702', 'color: #10b981; font-size: 14px;');

// Track page load time
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
});

// Service worker registration (for PWA - optional)
if ('serviceWorker' in navigator) {
    // Uncomment to enable PWA functionality
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered'))
    //     .catch(err => console.log('Service Worker registration failed'));
}

// Handle offline status
window.addEventListener('offline', () => {
    const offlineMsg = document.createElement('div');
    offlineMsg.id = 'offline-message';
    offlineMsg.innerHTML = '⚠️ You are currently offline. Some features may not work.';
    offlineMsg.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; background: #ef4444; color: white; padding: 10px; text-align: center; z-index: 9999;';
    document.body.prepend(offlineMsg);
});

window.addEventListener('online', () => {
    const offlineMsg = document.getElementById('offline-message');
    if (offlineMsg) {
        offlineMsg.remove();
    }
});

// Initialize tooltips (if needed)
document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = this.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);

        const rect = this.getBoundingClientRect();
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
    });

    element.addEventListener('mouseleave', function() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) tooltip.remove();
    });
});

// Add year to footer copyright
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.textContent = footerText.textContent.replace('2026', currentYear);
}

// Lazy load images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('%c✅ All scripts loaded successfully!', 'color: #10b981; font-size: 14px;');