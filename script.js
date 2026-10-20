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

    const carCards = document.querySelectorAll('#fleetGrid .car-card');
    carCards.forEach(card => {
        card.hidden = category !== 'all' && card.dataset.category !== category;
    });
}

const fleetVehicles = [
    { name: 'Perodua Viva (M)', category: 'compact', fuel: 'Petrol', transmission: 'Manual', capacity: '5 pax', engine: '1.0L', image: 'images/viva.png', rate: 80 },
    { name: 'Perodua Axia 2nd Gen (A)', category: 'compact', fuel: 'Petrol', transmission: 'Auto', capacity: '5 pax', engine: '1.0L', image: 'images/axia.png', rate: 100 },
    { name: 'Perodua Axia 3rd Gen (A)', category: 'compact', fuel: 'Petrol', transmission: 'Auto', capacity: '5 pax', engine: '1.0L', image: 'images/axia3.png', rate: 100 },
    { name: 'Perodua Myvi 2nd Gen (A)', category: 'compact', fuel: 'Petrol', transmission: 'Auto', capacity: '5 pax', engine: '1.5L', image: 'images/myvi.png', rate: 120 },
    { name: 'Perodua Myvi 3rd Gen (A)', category: 'compact', fuel: 'Petrol', transmission: 'Auto', capacity: '5 pax', engine: '1.5L', image: 'images/myvi2.png', rate: 150 },
    { name: 'Proton Saga (New)', category: 'sedan', fuel: 'Petrol', transmission: 'Auto', capacity: '5 pax', engine: '1.5L', image: 'images/saga.png', rate: 130 },
    { name: 'Perodua Bezza (New)', category: 'sedan', fuel: 'Petrol', transmission: 'Auto', capacity: '5 pax', engine: '1.3L', image: 'images/bezza.png', rate: 140 },
    { name: 'Proton Persona', category: 'sedan', fuel: 'Petrol', transmission: 'Auto', capacity: '5 pax', engine: '1.5L', image: 'images/persona.png', rate: 140 },
    { name: 'Toyota Vios', category: 'sedan', fuel: 'Petrol', transmission: 'Auto', capacity: '5 pax', engine: '1.5L', image: 'images/vios.png', rate: 180 },
    { name: 'Honda City', category: 'sedan', fuel: 'Petrol', transmission: 'Auto', capacity: '5 pax', engine: '1.5L', image: 'images/city.png', rate: 250 },
    { name: 'Perodua Alza 1st Gen', category: 'mpv', fuel: 'Petrol', transmission: 'Auto', capacity: '7 pax', engine: '1.5L', image: 'images/alza.png', rate: null },
    { name: 'Perodua Alza 3rd Gen', category: 'mpv', fuel: 'Petrol', transmission: 'Auto', capacity: '7 pax', engine: '1.5L', image: 'images/alza3.png', rate: null },
    { name: 'Toyota Innova 1st Gen', category: 'mpv', fuel: 'Petrol', transmission: 'Auto', capacity: '8 pax', engine: '2.0L', image: 'images/innova.png', rate: null },
    { name: 'Toyota Innova Crysta 2nd Gen', category: 'mpv', fuel: 'Petrol', transmission: 'Auto', capacity: '8 pax', engine: '2.0L', image: 'images/innova3.png', rate: null },
    { name: 'Perodua Aruz', category: 'mpv', fuel: 'Petrol', transmission: 'Auto', capacity: '8 pax', engine: '2.0L', image: 'images/aruz.png', rate: 250 },
    { name: 'Proton X70', category: 'suv', fuel: 'Petrol', transmission: 'Auto', capacity: '5 pax', engine: '1.8L Turbo', image: 'images/x70.png', rate: 350 },
    { name: 'Proton X50', category: 'suv', fuel: 'Petrol', transmission: 'Auto', capacity: '5 pax', engine: '1.5L Turbo', image: 'images/x50.png', rate: null },
    { name: 'Hyundai Starex', category: 'luxury-mpv', fuel: 'Diesel', transmission: 'Auto', capacity: '12 pax', engine: '2.5L Turbo', image: 'images/starex.png', rate: 480 },
    { name: 'Hyundai Staria', category: 'luxury-mpv', fuel: 'Diesel', transmission: 'Auto', capacity: '11 pax', engine: '2.2L Turbo', image: 'images/staria.png', rate: 650 },
    { name: 'Toyota Alphard SC', category: 'luxury-mpv', fuel: 'Petrol', transmission: 'Auto', capacity: '7 pax', engine: '2.5L', image: 'images/alphard.png', rate: 950 },
    { name: 'Toyota Hiace', category: 'van', fuel: 'Diesel', transmission: 'Manual', capacity: '11 pax', engine: '—', image: 'images/hiace.png', rate: 350 },
    { name: 'Nissan Urvan', category: 'van', fuel: 'Diesel', transmission: 'Manual', capacity: '15 pax', engine: '—', image: 'images/urvan.png', rate: 450 },
    { name: 'CAM Placer-X', category: 'van', fuel: 'Diesel', transmission: 'Manual', capacity: '18 pax', engine: '—', image: 'images/camplacerx.png', rate: 550 }
];

const categoryLabels = {
    compact: 'Compact Car',
    sedan: 'Sedan',
    mpv: 'MPV',
    suv: 'SUV',
    'luxury-mpv': 'Luxury MPV',
    van: 'Van'
};

const specIcons = {
    fuel: '<path d="M4 22V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v17M3 22h14M7 7h6M16 8h2l3 3v7a2 2 0 0 1-4 0v-4h-1"/>',
    transmission: '<circle cx="12" cy="12" r="3"/><path d="M12 2v7m0 6v7M2 12h7m6 0h7M5 5l5 5m4 4 5 5m0-14-5 5m-4 4-5 5"/>',
    capacity: '<circle cx="12" cy="8" r="3"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/>',
    engine: '<path d="M3 13a9 9 0 1 1 18 0"/><path d="m12 13 4-4M5 18h14"/>'
};

function renderVehicleSpec(label, value, icon) {
    return `<div class="vehicle-spec">
        <svg class="vehicle-spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${specIcons[icon]}</svg>
        <span class="vehicle-spec-label">${label}</span>
        <strong class="vehicle-spec-value">${value}</strong>
    </div>`;
}

const fleetGrid = document.getElementById('fleetGrid');
fleetVehicles.forEach((vehicle, index) => {
    const categoryLabel = categoryLabels[vehicle.category];
    const image = vehicle.image
        ? `<img src="${vehicle.image}" alt="${vehicle.name}" loading="lazy">`
        : '<div class="car-image-placeholder">Image coming soon</div>';
    const rateText = vehicle.rate === null ? 'Contact for price' : `RM ${vehicle.rate}`;
    const rateUnit = vehicle.rate === null ? 'Quote on request' : '/ day';
    const card = document.createElement('article');
    card.className = `car-card reveal-on-scroll delay-${(index % 3) + 1}`;
    card.dataset.category = vehicle.category;
    card.dataset.rate = vehicle.rate === null ? '' : String(vehicle.rate);
    card.innerHTML = `
        <div class="car-image-box">
            <span class="car-tag-category">${categoryLabel}</span>
            ${image}
        </div>
        <div class="car-details">
            <h3 class="car-name">${vehicle.name}</h3>
            <div class="car-specs">
                ${renderVehicleSpec('Fuel', vehicle.fuel, 'fuel')}
                ${renderVehicleSpec('Transmission', vehicle.transmission, 'transmission')}
                ${renderVehicleSpec('Capacity', vehicle.capacity, 'capacity')}
                ${renderVehicleSpec('Engine', vehicle.engine, 'engine')}
            </div>
            <div class="car-footer">
                <div class="car-price-box">
                    <span class="price-amount">${rateText}</span>
                    <span class="price-unit${vehicle.rate === null ? ' quote-note' : ''}">${rateUnit}</span>
                </div>
                <button class="btn-select-car" type="button" data-book-car="${vehicle.name}">Choose this car</button>
            </div>
        </div>`;
    fleetGrid.appendChild(card);
});

fleetGrid.addEventListener('click', event => {
    const button = event.target.closest('[data-book-car]');
    if (button) {
        selectCarForBooking(button.dataset.bookCar);
    }
});

const availableCars = document.getElementById('availableCars');
const fleetCards = Array.from(document.querySelectorAll('#fleetGrid .car-card'));
fleetCards.forEach(card => {
    const carName = card.querySelector('.car-name').textContent.trim();
    const dailyRate = card.dataset.rate;
    const option = document.createElement('option');
    option.value = carName;
    option.label = dailyRate ? `RM ${dailyRate} per day` : 'Contact for price';
    availableCars.appendChild(option);
});

// Select Car from Fleet Grid into Hero Form
function selectCarForBooking(carName) {
    const carField = document.getElementById('mainCarSelect');
    carField.value = carName;
    carField.setCustomValidity('');
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
    const dailyRate = carCard && carCard.dataset.rate
        ? Number.parseInt(carCard.dataset.rate, 10)
        : null;

    return { carField, carName, carCard, dailyRate };
}

// Calculation Logic
function updateCalculation() {
    const { carField, carCard, dailyRate } = getSelectedCar();

    carField.setCustomValidity(carCard ? '' : 'Choose a car from the list.');
    if (!carCard) {
        document.getElementById('sumTotalPrice').innerText = 'RM 0';
        return;
    }

    if (dailyRate === null) {
        document.getElementById('sumTotalPrice').innerText = 'Contact for price';
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
    const { carField, carName, carCard, dailyRate } = getSelectedCar();
    if (!carCard) {
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
    const returnLocation = document.getElementById('returnLocation').value.trim() || 'Not selected';

    const pickDateObj = new Date(pickDate);
    const returnDateObj = new Date(returnDate);
    let diffDays = 1;
    if (returnDateObj > pickDateObj) {
        const diffTime = Math.abs(returnDateObj - pickDateObj);
        diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    const estimatedTotal = dailyRate === null
        ? 'To be confirmed'
        : `RM ${dailyRate * diffDays}`;

    const textMsg = `Hello AZ Pinnacle Auto (Penang Car Rental),\n` +
                    `I would like to check if a car is available:\n\n` +
                    `🚗 Car model: ${carName}\n` +
                    `🛞 Driving option: ${driverLabel}\n` +
                    `📍 Pickup location: ${pickupLocation}\n` +
                    `📍 Return location: ${returnLocation}\n` +
                    `📅 Pick-up: ${pickDate} at ${pickTime}\n` +
                    `📅 Return: ${returnDate} at ${returnTime} (${diffDays} days)\n` +
                    `💰 Estimated total: ${estimatedTotal}\n\n` +
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