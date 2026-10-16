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

// Fleet Filtering
function filterFleet(category, element) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');

    const carCards = document.querySelectorAll('.car-card');
    carCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Select Car from Fleet Grid into Hero Form
function selectCarForBooking(carName, rate) {
    const select = document.getElementById('mainCarSelect');
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value.startsWith(carName)) {
            select.selectedIndex = i;
            break;
        }
    }
    updateCalculation();
    scrollToBooking();
}

function scrollToBooking() {
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

// Calculation Logic
function updateCalculation() {
    const carVal = document.getElementById('mainCarSelect').value;
    const [carName, carRateStr] = carVal.split('|');
    const dailyRate = parseInt(carRateStr, 10);

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
    const carVal = document.getElementById('mainCarSelect').value;
    const [carName, carRateStr] = carVal.split('|');
    const dailyRate = parseInt(carRateStr, 10);

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