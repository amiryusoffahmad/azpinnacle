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

    const driverVal = document.getElementById('driverOption').value;
    const [driverMode, driverFeeStr] = driverVal.split('|');
    const driverDailyFee = parseInt(driverFeeStr, 10);

    const pickDateVal = new Date(document.getElementById('pickDate').value);
    const returnDateVal = new Date(document.getElementById('returnDate').value);

    let diffDays = 1;
    if (returnDateVal > pickDateVal) {
        const diffTime = Math.abs(returnDateVal - pickDateVal);
        diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    const totalCost = (dailyRate + driverDailyFee) * diffDays;

    // Update harga terus pada butang
    document.getElementById('sumTotalPrice').innerText = `RM ${totalCost}`;
}

// WhatsApp Trigger
function sendBookingToWhatsApp() {
    const carVal = document.getElementById('mainCarSelect').value;
    const [carName, carRateStr] = carVal.split('|');
    const dailyRate = parseInt(carRateStr, 10);

    const driverVal = document.getElementById('driverOption').value;
    const [driverMode, driverFeeStr] = driverVal.split('|');
    const driverDailyFee = parseInt(driverFeeStr, 10);
    const driverLabel = driverMode === 'driver' ? 'Sekali Pemandu (With Driver)' : 'Pandu Sendiri (Self Drive)';

    const pickDate = document.getElementById('pickDate').value;
    const pickTime = document.getElementById('pickTime').value;
    const returnDate = document.getElementById('returnDate').value;
    const returnTime = document.getElementById('returnTime').value;

    const pickDateObj = new Date(pickDate);
    const returnDateObj = new Date(returnDate);
    let diffDays = 1;
    if (returnDateObj > pickDateObj) {
        const diffTime = Math.abs(returnDateObj - pickDateObj);
        diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    const totalCost = (dailyRate + driverDailyFee) * diffDays;

    const textMsg = `Salam AZ Pinnacle Auto (Penang Car Rental),\n` +
                    `Saya nak semak kekosongan sewa kereta:\n\n` +
                    `🚗 Model Kereta: ${carName}\n` +
                    `🛞 Mod Pemanduan: ${driverLabel}\n` +
                    `📅 Ambil (Pickup): ${pickDate} @ ${pickTime}\n` +
                    `📅 Pulang (Return): ${returnDate} @ ${returnTime} (${diffDays} Hari)\n` +
                    `💰 Anggaran Jumlah: RM ${totalCost}\n\n` +
                    `Adakah kereta ini available pada tarikh tersebut? Terima kasih!`;

    const waPhone = "60177644262";
    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(textMsg)}`;
    window.open(waUrl, '_blank');
}

// WhatsApp Booking Trigger
function sendBookingToWhatsApp() {
    const carVal = document.getElementById('mainCarSelect').value;
    const [carName, carRateStr] = carVal.split('|');
    const dailyRate = parseInt(carRateStr, 10);

    const driverVal = document.getElementById('driverOption').value;
    const [driverMode, driverFeeStr] = driverVal.split('|');
    const driverDailyFee = parseInt(driverFeeStr, 10);
    const driverLabel = driverMode === 'driver' ? 'Sekali Pemandu (With Driver)' : 'Pandu Sendiri (Self Drive)';

    const pickDate = document.getElementById('pickDate').value;
    const pickTime = document.getElementById('pickTime').value;
    const returnDate = document.getElementById('returnDate').value;
    const returnTime = document.getElementById('returnTime').value;

    const custName = document.getElementById('custName').value.trim() || 'Pelanggan';
    const custLoc = document.getElementById('custLoc').value.trim() || 'Penang Airport / Bayan Lepas';

    const pickDateObj = new Date(pickDate);
    const returnDateObj = new Date(returnDate);
    let diffDays = 1;
    if (returnDateObj > pickDateObj) {
        const diffTime = Math.abs(returnDateObj - pickDateObj);
        diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    const totalCost = (dailyRate + driverDailyFee) * diffDays;

    const textMsg = `Salam AZ Pinnacle Auto (Penang Car Rental),\n` +
                    `Saya nak semak kekosongan sewa kereta:\n\n` +
                    `👤 Nama: ${custName}\n` +
                    `🚗 Model Kereta: ${carName}\n` +
                    `🛞 Mod Pemanduan: ${driverLabel}\n` +
                    `📅 Ambil (Pickup): ${pickDate} @ ${pickTime}\n` +
                    `📅 Pulang (Return): ${returnDate} @ ${returnTime} (${diffDays} Hari)\n` +
                    `📍 Lokasi / Destinasi: ${custLoc}\n` +
                    `💰 Anggaran Jumlah: RM ${totalCost}\n\n` +
                    `Adakah kereta ini available pada tarikh tersebut? Terima kasih!`;

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