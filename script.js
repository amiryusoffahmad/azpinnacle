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
    { name: 'Perodua Axia 3rd Gen (A)', category: 'compact', fuel: 'Petrol', transmission: 'Auto', capacity: '5 pax', engine: '1.0L', image: 'images/axia3.png', rate: 130 },
    { name: 'Perodua Myvi 2nd Gen (A)', category: 'compact', fuel: 'Petrol', transmission: 'Auto', capacity: '5 pax', engine: '1.5L', image: 'images/myvi.png', rate: 120 },
    { name: 'Perodua Myvi 3rd Gen (A)', category: 'compact', fuel: 'Petrol', transmission: 'Auto', capacity: '5 pax', engine: '1.5L', image: 'images/myvi2.png', rate: 150 },
    { name: 'Proton Saga (New)', category: 'sedan', fuel: 'Petrol', transmission: 'Auto', capacity: '5 pax', engine: '1.5L', image: 'images/saga.png', rate: 140 },
    { name: 'Perodua Bezza (New)', category: 'sedan', fuel: 'Petrol', transmission: 'Auto', capacity: '5 pax', engine: '1.3L', image: 'images/bezza.png', rate: 140 },
    { name: 'Proton Persona', category: 'sedan', fuel: 'Petrol', transmission: 'Auto', capacity: '5 pax', engine: '1.5L', image: 'images/persona.png', rate: 140 },
    { name: 'Toyota Vios', category: 'sedan', fuel: 'Petrol', transmission: 'Auto', capacity: '5 pax', engine: '1.5L', image: 'images/vios.png', rate: 180 },
    { name: 'Honda City', category: 'sedan', fuel: 'Petrol', transmission: 'Auto', capacity: '5 pax', engine: '1.5L', image: 'images/city.png', rate: 250 },
    { name: 'Perodua Alza 1st Gen', category: 'mpv', fuel: 'Petrol', transmission: 'Auto', capacity: '7 pax', engine: '1.5L', image: 'images/alza.png', rate: 170 },
    { name: 'Perodua Alza 3rd Gen', category: 'mpv', fuel: 'Petrol', transmission: 'Auto', capacity: '7 pax', engine: '1.5L', image: 'images/alza3.png', rate: 230 },
    { name: 'Toyota Innova 1st Gen', category: 'mpv', fuel: 'Petrol', transmission: 'Auto', capacity: '8 pax', engine: '2.0L', image: 'images/innova.png', rate: 250 },
    { name: 'Toyota Innova Crysta 2nd Gen', category: 'mpv', fuel: 'Petrol', transmission: 'Auto', capacity: '8 pax', engine: '2.0L', image: 'images/innova3.png', rate: 300 },
    { name: 'Perodua Aruz', category: 'mpv', fuel: 'Petrol', transmission: 'Auto', capacity: '8 pax', engine: '2.0L', image: 'images/aruz.png', rate: 230 },
    { name: 'Proton X70', category: 'suv', fuel: 'Petrol', transmission: 'Auto', capacity: '5 pax', engine: '1.8L Turbo', image: 'images/x70.png', rate: 350 },
    { name: 'Proton X50', category: 'suv', fuel: 'Petrol', transmission: 'Auto', capacity: '5 pax', engine: '1.5L Turbo', image: 'images/x50.png', rate: 350 },
    { name: 'Hyundai Starex', category: 'luxury-mpv', fuel: 'Diesel', transmission: 'Auto', capacity: '12 pax', engine: '2.5L Turbo', image: 'images/starex.png', rate: 480 },
    { name: 'Hyundai Staria', category: 'luxury-mpv', fuel: 'Diesel', transmission: 'Auto', capacity: '11 pax', engine: '2.2L Turbo', image: 'images/staria.png', rate: 650 },
    { name: 'Toyota Alphard SC', category: 'luxury-mpv', fuel: 'Petrol', transmission: 'Auto', capacity: '7 pax', engine: '2.5L', image: 'images/alphard.png', rate: 750 },
    { name: 'Toyota Hiace', category: 'van', fuel: 'Diesel', transmission: 'Manual', capacity: '11 pax', engine: '2.5cc', image: 'images/hiace.png', rate: 350 },
    { name: 'Nissan Urvan', category: 'van', fuel: 'Diesel', transmission: 'Manual', capacity: '15 pax', engine: '2.5cc turbo', image: 'images/urvan.png', rate: 450 },
    { name: 'CAM Placer-X', category: 'van', fuel: 'Diesel', transmission: 'Manual', capacity: '18 pax', engine: '3.0cc', image: 'images/camplacerx.png', rate: 550 }
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
    const imageFramingClass = ['images/staria.png', 'images/myvi.png', 'images/myvi2.png'].includes(vehicle.image)
        ? ' image-framing-tight'
        : '';
    const card = document.createElement('article');
    card.className = `car-card reveal-on-scroll delay-${(index % 3) + 1}`;
    card.dataset.category = vehicle.category;
    card.dataset.rate = vehicle.rate === null ? '' : String(vehicle.rate);
    card.innerHTML = `
        <div class="car-image-box${imageFramingClass}">
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

// Jadual Pakej Harga Mengikut Hari (Selaras dengan Fleet Vehicles)
const rentalPackages = {
    'viva': { 1: 80, 3: 250, 7: 525, 14: 800, 30: 1200 },
    'axia 2nd gen': { 1: 100, 3: 290, 7: 650, 14: 980, 30: 1600 },
    'axia 3rd gen': { 1: 130, 3: 370, 7: 800, 14: 1100, 30: 1900 },
    'myvi 2nd gen': { 1: 120, 3: 350, 7: 750, 14: 1000, 30: 1800 },
    'myvi 3rd gen': { 1: 150, 3: 420, 7: 950, 14: 1300, 30: 2300 },
    'bezza': { 1: 140, 3: 400, 7: 900, 14: 1200, 30: 2200 },
    'saga': { 1: 140, 3: 400, 7: 900, 14: 1200, 30: 2200 },
    'persona': { 1: 140, 3: 400, 7: 900, 14: 1200, 30: 2200 },
    'vios': { 1: 180, 3: 450, 7: 1000, 14: 1700, 30: 2800 },
    'city': { 1: 250, 3: 700, 7: 1500, 14: 2000, 30: 3500 },
    'alza 1st gen': { 1: 170, 3: 440, 7: 1000, 14: 1600, 30: 2700 },
    'alza 3rd gen': { 1: 230, 3: 650, 7: 1400, 14: 1800, 30: 3200 },
    'innova 1st gen': { 1: 250, 3: 700, 7: 1500, 14: 2000, 30: 3000 },
    'innova crysta': { 1: 300, 3: 850, 7: 1800, 14: 2300, 30: 3500 },
    'aruz': { 1: 230, 3: 650, 7: 1400, 14: 1800, 30: 3200 },
    'x70': { 1: 350, 3: 900, 7: 1800, 14: 2500, 30: 4000 },
    'x50': { 1: 350, 3: 900, 7: 1800, 14: 2500, 30: 4000 },
    'starex': { 1: 480, 3: 1350, 7: 2500, 14: 3000, 30: 5000 },
    'staria': { 1: 650, 3: 1800, 7: 3600, 14: 5000, 30: 8000 },
    'alphard': { 1: 750, 3: 2100, 7: 4000, 14: 6000, 30: 9000 },
    'hiace': { 1: 350, 3: 900, 7: 1900, 14: 2500, 30: 4000 },
    'urvan': { 1: 450, 3: 1200, 7: 2200, 14: 2700, 30: 4500 },
    'placer': { 1: 550, 3: 1500, 7: 2500, 14: 3000, 30: 5000 }
};

// Rate per jam mengikut kategori/model kereta (Selaras dengan Fleet Vehicles)
const hourlyRates = {
    'viva': 8,
    'axia 2nd gen': 10,
    'axia 3rd gen': 12,
    'myvi 2nd gen': 12,
    'myvi 3rd gen': 15,
    'saga': 15,
    'bezza': 15,
    'persona': 15,
    'vios': 20,
    'city': 20,
    'alza 1st gen': 15,
    'alza 3rd gen': 20,
    'innova 1st gen': 20,
    'innova crysta': 30,
    'aruz': 20,
    'x70': 30,
    'x50': 30,
    'starex': 45,
    'staria': 70,
    'alphard': 90,
    'hiace': 45,
    'urvan': 45,
    'placer': 45
};

function getHourlyRate(carName) {
    const nameLower = carName.toLowerCase();
    for (const [key, rate] of Object.entries(hourlyRates)) {
        if (nameLower.includes(key)) {
            return rate;
        }
    }
    return 0;
}

function calculatePackageCost(carName, totalDays, dailyRateFallback) {
    const nameLower = carName.toLowerCase();
    let matchedPkg = null;

    for (const [key, pkg] of Object.entries(rentalPackages)) {
        if (nameLower.includes(key)) {
            matchedPkg = pkg;
            break;
        }
    }

    if (!matchedPkg) {
        return totalDays * dailyRateFallback;
    }

    let remainingDays = totalDays;
    let totalCost = 0;
    const tiers = [30, 14, 7, 3, 1];

    for (let tier of tiers) {
        if (remainingDays >= tier && matchedPkg[tier]) {
            const multiplier = Math.floor(remainingDays / tier);
            totalCost += multiplier * matchedPkg[tier];
            remainingDays %= tier;
        }
    }

    if (remainingDays > 0) {
        totalCost += remainingDays * matchedPkg[1];
    }

    return Math.round(totalCost);
}

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

    const pickDateVal = document.getElementById('pickDate').value;
    const pickTimeVal = document.getElementById('pickTime').value || "10:00";
    const returnDateVal = document.getElementById('returnDate').value;
    const returnTimeVal = document.getElementById('returnTime').value || "10:00";

    if (!pickDateVal || !returnDateVal) return;

    const pickDateTime = new Date(`${pickDateVal}T${pickTimeVal}`);
    const returnDateTime = new Date(`${returnDateVal}T${returnTimeVal}`);

    let totalHours = 0;
    if (returnDateTime > pickDateTime) {
        const diffMs = returnDateTime - pickDateTime;
        totalHours = Math.ceil(diffMs / (1000 * 60 * 60)); 
    } else {
        totalHours = 24; 
    }

    let baseDays = Math.floor(totalHours / 24);
    let extraHours = totalHours % 24;

    if (extraHours >= 10) {
        baseDays += 1;
        extraHours = 0;
    }

    if (baseDays === 0) {
        baseDays = 1;
        extraHours = 0;
    }

    const carName = document.getElementById('mainCarSelect').value;
    const hourlyRate = getHourlyRate(carName);

    // Kira Kos Pakej vs Kos Asal (untuk kesan penjimatan/diskaun)
    const standardCostWithoutPackage = baseDays * dailyRate;
    const packageCost = calculatePackageCost(carName, baseDays, dailyRate);
    const extraHourCost = extraHours * hourlyRate;
    const carRentalCost = packageCost + extraHourCost;

    // Kira jumlah penjimatan (Perbandingan kos standard vs kos pakej + jam lebihan)
    const standardTotalCost = (baseDays * dailyRate) + (extraHours * hourlyRate);
    let savingsAmount = standardTotalCost - carRentalCost;
    if (savingsAmount < 5) savingsAmount = 0; // Tunjuk jika penjimatan bernilai RM5 ke atas

    // Delivery Fee
    const pickupLocationText = document.getElementById('pickupLocation').value.toLowerCase();
    let deliveryFee = 0;

    if (pickupLocationText.includes('batu ferringhi')) {
        deliveryFee = 80;
    } else if (pickupLocationText.includes('balik pulau') || pickupLocationText.includes('georgetown') || pickupLocationText.includes('butterworth') || pickupLocationText.includes('sentral') || pickupLocationText.includes('ferry')) {
        deliveryFee = 60;
    } else if (pickupLocationText.includes('gelugor')) {
        deliveryFee = 40;
    } else if (pickupLocationText.includes('lexis suites')) {
        deliveryFee = 30;
    } else if (pickupLocationText.includes('spice') || pickupLocationText.includes('bayan lepas')) {
        deliveryFee = 20;
    }

    // Add-ons
    let addOnsTotal = 0;
    let addOnsDetails = [];
    const addonInputs = document.querySelectorAll('.addon-qty');
    addonInputs.forEach(input => {
        const price = parseInt(input.getAttribute('data-price')) || 0;
        const qty = parseInt(input.value) || 0;
        if (qty > 0) {
            // Ambil tajuk utama add-on sahaja (elak ambil description di bawahnya)
            const addonName = input.closest('.addon-row').querySelector('div > div:first-child').innerText;
            addOnsTotal += (price * qty);
            addOnsDetails.push(`- ${addonName} x${qty} (RM ${price * qty})`);
        }
    });

    const grandTotal = carRentalCost + deliveryFee + addOnsTotal;

    let durationText = `${baseDays} day(s)`;
    if (extraHours > 0) {
        durationText += ` + ${extraHours} hr(s)`;
    }

    let priceMainText = `RM ${grandTotal}`;
    let breakdownParts = [`RM ${carRentalCost}`];

    if (deliveryFee > 0) {
        breakdownParts.push(`RM ${deliveryFee} delivery`);
    }
    if (addOnsTotal > 0) {
        breakdownParts.push(`RM ${addOnsTotal} addons`);
    }

    let priceSubText = breakdownParts.length > 1 ? `(${breakdownParts.join(' + ')})` : '';

    // Paparan nota diskaun/penjimatan jika layak mendapat harga pakej
    let offerNoteHtml = '';
    if (savingsAmount > 0 && baseDays >= 3) {
        offerNoteHtml = `<div style="font-size: 0.7rem; color: #10b981; font-weight: 600; margin-top: 2px;">Package Offer Applied! You save approx. RM ${Math.round(savingsAmount)}</div>`;
    }

    document.getElementById('sumDays').innerText = durationText;
    document.getElementById('sumTotalPrice').innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 2px;">
            <div style="display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;">
                <span style="font-size: 1.3rem; font-weight: 700; color: var(--accent-red, #ef4444);">${priceMainText}</span>
                ${priceSubText ? `<span style="font-size: 0.78rem; color: var(--text-secondary, #9ca3af); font-weight: normal;">${priceSubText}</span>` : ''}
            </div>
            ${offerNoteHtml}
        </div>
    `;
}

// WhatsApp Booking Trigger (Diselaraskan menggunakan calculatePackageCost)
function sendBookingToWhatsApp() {
    const customerNameField = document.getElementById('customerName');
    const customerName = customerNameField.value.trim();
    customerNameField.setCustomValidity(customerName ? '' : 'Please enter your name.');
    if (!customerNameField.reportValidity()) {
        return;
    }

    const { carField, carName, carCard, dailyRate } = getSelectedCar();
    if (!carCard) {
        carField.setCustomValidity('Choose a car from the list.');
        carField.reportValidity();
        return;
    }

    const driverLabel = document.getElementById('driverOption').checked ? 'With a driver' : 'Drive myself';

    const pickDateVal = document.getElementById('pickDate').value;
    const pickTimeVal = document.getElementById('pickTime').value || "10:00";
    const returnDateVal = document.getElementById('returnDate').value;
    const returnTimeVal = document.getElementById('returnTime').value || "10:00";

    const pickupLocation = document.getElementById('pickupLocation').value.trim() || 'Not selected';
    const returnLocation = document.getElementById('returnLocation').value.trim() || 'Not selected';

    if (!pickDateVal || !returnDateVal) {
        alert('Please select pick-up and return dates.');
        return;
    }

    const pickDateTime = new Date(`${pickDateVal}T${pickTimeVal}`);
    const returnDateTime = new Date(`${returnDateVal}T${returnTimeVal}`);

    let totalHours = 0;
    if (returnDateTime > pickDateTime) {
        const diffMs = returnDateTime - pickDateTime;
        totalHours = Math.ceil(diffMs / (1000 * 60 * 60));
    } else {
        totalHours = 24;
    }

    let baseDays = Math.floor(totalHours / 24);
    let extraHours = totalHours % 24;

    if (extraHours >= 10) {
        baseDays += 1;
        extraHours = 0;
    }
    if (baseDays === 0) {
        baseDays = 1;
        extraHours = 0;
    }

    const hourlyRate = getHourlyRate(carName);
    const packageCost = calculatePackageCost(carName, baseDays, dailyRate);
    const extraHourCost = extraHours * hourlyRate;
    const carRentalCost = dailyRate !== null ? packageCost + extraHourCost : 0;

    // Delivery Fee
    const pickupLocationText = pickupLocation.toLowerCase();
    let deliveryFee = 0;
    if (pickupLocationText.includes('batu ferringhi')) {
        deliveryFee = 80;
    } else if (pickupLocationText.includes('balik pulau') || pickupLocationText.includes('georgetown') || pickupLocationText.includes('butterworth') || pickupLocationText.includes('sentral') || pickupLocationText.includes('ferry')) {
        deliveryFee = 60;
    } else if (pickupLocationText.includes('gelugor')) {
        deliveryFee = 40;
    } else if (pickupLocationText.includes('lexis suites')) {
        deliveryFee = 30;
    } else if (pickupLocationText.includes('spice') || pickupLocationText.includes('bayan lepas')) {
        deliveryFee = 20;
    }

    // Add-ons
    let addOnsTotal = 0;
    let addOnsDetails = [];
    const addonInputs = document.querySelectorAll('.addon-qty');
    addonInputs.forEach(input => {
        const price = parseInt(input.getAttribute('data-price')) || 0;
        const qty = parseInt(input.value) || 0;
        if (qty > 0) {
            const addonName = input.closest('.addon-row').querySelector('div > div').innerText;
            addOnsTotal += (price * qty);
            addOnsDetails.push(`- ${addonName} x${qty} (RM ${price * qty})`);
        }
    });

    const grandTotal = dailyRate !== null ? carRentalCost + deliveryFee + addOnsTotal : null;

    let durationText = `${baseDays} day(s)`;
    if (extraHours > 0) {
        durationText += ` + ${extraHours} hr(s)`;
    }

    let estimatedTotal = 'To be confirmed';
    if (grandTotal !== null) {
        let breakdown = [`RM ${carRentalCost} car`];
        if (deliveryFee > 0) breakdown.push(`RM ${deliveryFee} delivery`);
        if (addOnsTotal > 0) breakdown.push(`RM ${addOnsTotal} addons`);
        estimatedTotal = `RM ${grandTotal} (${breakdown.join(' + ')})`;
    }

    const textMsg = `Hello AZ Pinnacle Auto (Penang Car Rental),\n` +
                    `I would like to check if a car is available:\n\n` +
                    `- Customer name: ${customerName}\n` +
                    `- Car model: ${carName}\n` +
                    `- Driving option: ${driverLabel}\n` +
                    `- Pickup location: ${pickupLocation}\n` +
                    `- Return location: ${returnLocation}\n` +
                    `- Pick-up: ${pickDateVal} at ${pickTimeVal}\n` +
                    `- Return: ${returnDateVal} at ${returnTimeVal} (${durationText})\n` +
                    (addOnsDetails.length > 0 ? `- Add-ons:\n${addOnsDetails.join('\n')}\n` : '') +
                    `- Estimated total: ${estimatedTotal}\n\n` +
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

function openTncModal(e) {
    if(e) e.preventDefault();
    document.getElementById('tncModal').style.display = 'flex';
}

function closeTncModal() {
    document.getElementById('tncModal').style.display = 'none';
}

// Tutup bila tekan luar modal
window.addEventListener('click', function(e) {
    const modal = document.getElementById('tncModal');
    if (e.target === modal) {
        closeTncModal();
    }
});