// Set Default Dates & Times
window.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatDate = (date) => date.toISOString().split('T')[0];

    document.getElementById('pickDate').value = formatDate(today);
    document.getElementById('returnDate').value = formatDate(tomorrow);

    document.getElementById('pickDate').min = formatDate(today);
    document.getElementById('returnDate').min = formatDate(today);

    updateCalculation();
});

// Light & Dark Mode Switcher
const themeToggleBtn = document.getElementById('themeToggleBtn');
const iconSun = document.querySelector('.icon-sun');
const iconMoon = document.querySelector('.icon-moon');

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    
    if (newTheme === 'light') {
        iconSun.style.display = 'inline-flex';
        iconMoon.style.display = 'none';
    } else {
        iconSun.style.display = 'none';
        iconMoon.style.display = 'inline-flex';
    }
});

// Mobile navigation drawer
const navbar = document.querySelector('.navbar');
const navMenuToggle = document.getElementById('navMenuToggle');
const navMenuBackdrop = document.getElementById('navMenuBackdrop');
const navLinks = document.getElementById('navLinks');
navLinks.setAttribute('aria-hidden', String(window.matchMedia('(max-width: 768px)').matches));

function setNavMenuOpen(isOpen) {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    navbar.classList.toggle('nav-menu-open', isOpen);
    navMenuToggle.setAttribute('aria-expanded', String(isOpen));
    navMenuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    navLinks.setAttribute('aria-hidden', String(!isOpen && isMobile));
    document.body.classList.toggle('nav-menu-open', isOpen);
}

navMenuToggle.addEventListener('click', () => {
    setNavMenuOpen(navMenuToggle.getAttribute('aria-expanded') !== 'true');
});

navMenuBackdrop.addEventListener('click', () => setNavMenuOpen(false));
navLinks.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
        setNavMenuOpen(false);
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenuToggle.getAttribute('aria-expanded') === 'true') {
        setNavMenuOpen(false);
        navMenuToggle.focus();
    }
});

window.matchMedia('(min-width: 769px)').addEventListener('change', (event) => {
    if (event.matches) {
        setNavMenuOpen(false);
        navLinks.removeAttribute('aria-hidden');
    } else {
        setNavMenuOpen(false);
        navLinks.setAttribute('aria-hidden', 'true');
    }
});

// Fleet Filtering
function filterFleet(category, element) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');

    const carCards = document.querySelectorAll('#fleetGrid .car-card:not([hidden])');
    carCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

const availableCars = document.getElementById('availableCars');
const fleetCards = Array.from(document.querySelectorAll('#fleetGrid .car-card'));
fleetCards.forEach(card => {
    const carName = card.querySelector('.car-name').textContent.trim();
    const dailyRate = card.querySelector('.price-amount').textContent.trim();
    const option = document.createElement('option');
    option.value = carName;
    option.label = `${dailyRate} per day`;
    availableCars.appendChild(option);
});

// Select Car from Fleet Grid into Hero Form
function selectCarForBooking(carName, rate) {
    document.getElementById('mainCarSelect').value = carName;
    updateCalculation();
    scrollToBooking();
}

function scrollToBooking() {
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

function getSelectedCar() {
    const carField = document.getElementById('mainCarSelect');
    const carName = carField.value.trim();
    const carCard = fleetCards
        .find(card => card.querySelector('.car-name').textContent.trim() === carName);
    const dailyRate = carCard
        ? parseInt(carCard.querySelector('.price-amount').textContent.replace(/[^\d]/g, ''), 10)
        : NaN;

    return { carField, carName, dailyRate };
}

// Calculation Logic
function updateCalculation() {
    const { carField, dailyRate } = getSelectedCar();

    carField.setCustomValidity(Number.isNaN(dailyRate) ? 'Choose a car from the list.' : '');
    if (Number.isNaN(dailyRate)) {
        document.getElementById('sumTotalPrice').innerText = 'RM 0';
        return;
    }

    const pickDateVal = new Date(document.getElementById('pickDate').value);
    const returnDateVal = new Date(document.getElementById('returnDate').value);

    let diffDays = 1;
    if (returnDateVal > pickDateVal) {
        const diffTime = Math.abs(returnDateVal - pickDateVal);
        diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    const totalCost = dailyRate * diffDays;

    // Update harga terus pada butang
    document.getElementById('sumTotalPrice').innerText = `RM ${totalCost}`;
}

// WhatsApp Booking Trigger
function sendBookingToWhatsApp() {
    const { carField, carName, dailyRate } = getSelectedCar();
    if (Number.isNaN(dailyRate)) {
        carField.setCustomValidity('Choose a car from the list.');
        carField.reportValidity();
        return;
    }

    const driverLabel = document.getElementById('driverOption').checked ? 'With a driver' : 'Drive myself';

    const pickDate = document.getElementById('pickDate').value;
    const pickTime = document.getElementById('pickTime').value;
    const returnDate = document.getElementById('returnDate').value;
    const returnTime = document.getElementById('returnTime').value;

    const pickupLocation = document.getElementById('pickupLocation').value.trim() || 'Not selected';

    const pickDateObj = new Date(pickDate);
    const returnDateObj = new Date(returnDate);
    let diffDays = 1;
    if (returnDateObj > pickDateObj) {
        const diffTime = Math.abs(returnDateObj - pickDateObj);
        diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    const totalCost = dailyRate * diffDays;

    const textMsg = `Hello AZ Pinnacle Auto (Penang Car Rental),\n` +
                    `I would like to check if a car is available:\n\n` +
                    `🚗 Car model: ${carName}\n` +
                    `🛞 Driving option: ${driverLabel}\n` +
                    `📍 Pickup location: ${pickupLocation}\n` +
                    `📅 Pick-up: ${pickDate} at ${pickTime}\n` +
                    `📅 Return: ${returnDate} at ${returnTime} (${diffDays} days)\n` +
                    `💰 Estimated total: RM ${totalCost}\n\n` +
                    `Is this car available on these dates? Thank you!`;

    const waPhone = "60177644262";
    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(textMsg)}`;
    window.open(waUrl, '_blank');
}

// Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observerOptions = { root: null, rootMargin: '0px 0px -40px 0px', threshold: 0.12 };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => scrollObserver.observe(el));
});