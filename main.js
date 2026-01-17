/* ==========================================
   MENTAL ARIFMETIKA O'QUV MARKAZI
   Professional JavaScript - MUKAMMAL VERSIYA
   ========================================== */

'use strict';

// ==================== EMAILJS INITIALIZATION ====================
(function() {
    emailjs.init("MFg6ATfPsmfEJUa1Z");
    console.log('✅ EmailJS initialized');
})();

// ==================== CONFIGURATION ====================
const CONFIG = {
    services: {
        registration: 'service_po3z4f6',
        contact: 'service_pi1j0dg'
    },
    templates: {
        payment: 'template_hvtmptn',
        register: 'template_85shsqy',
        contact: 'template_a0httvf'
    },
    adminEmail: 'asadbekmavrulbekov62@gmail.com',
    adminPhone: '+998993490405',
    companyName: 'Mental Arifmetika O\'quv Markazi'
};

// ==================== VALIDATION FUNCTIONS ====================
function validatePhone(phone) {
    const cleaned = phone.replace(/\s/g, '').replace(/\+/g, '');
    return /^998\d{9}$/.test(cleaned);
}

function validateName(name) {
    return name.trim().length >= 3 && /^[a-zA-Zа-яА-ЯўғҚқҲҳ\s]+$/.test(name);
}

function validateAge(age) {
    const numAge = parseInt(age);
    return numAge >= 4 && numAge <= 18;
}

function validateCard(cardNumber) {
    const cleaned = cardNumber.replace(/\s/g, '');
    return cleaned.length === 16 && /^\d+$/.test(cleaned);
}

function validateExpiry(expiry) {
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;
    const [month, year] = expiry.split('/').map(Number);
    if (month < 1 || month > 12) return false;
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return false;
    }
    return true;
}

function validateCVV(cvv) {
    return /^\d{3}$/.test(cvv);
}

function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (!value.startsWith('998')) {
        if (value.length > 0 && !value.startsWith('9')) {
            value = '998' + value;
        } else if (value.startsWith('9') && !value.startsWith('998')) {
            value = '998' + value.substring(value.startsWith('99') ? 2 : 1);
        }
    }
    
    value = value.substring(0, 12);
    
    if (value.length > 3) {
        let formatted = '+998';
        const rest = value.substring(3);
        if (rest.length > 0) formatted += ' ' + rest.substring(0, 2);
        if (rest.length > 2) formatted += ' ' + rest.substring(2, 5);
        if (rest.length > 5) formatted += ' ' + rest.substring(5, 7);
        if (rest.length > 7) formatted += ' ' + rest.substring(7, 9);
        input.value = formatted;
    } else {
        input.value = '+' + value;
    }
}

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'success') {
    const existing = document.querySelector('.custom-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .custom-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            min-width: 300px;
            max-width: 500px;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            background: white;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            transform: translateX(500px);
            transition: transform 0.3s ease;
            animation: slideIn 0.3s ease forwards;
        }
        
        .custom-notification.success {
            border-left: 4px solid #10b981;
        }
        
        .custom-notification.error {
            border-left: 4px solid #ef4444;
        }
        
        .custom-notification.info {
            border-left: 4px solid #3b82f6;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .notification-icon {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1rem;
        }
        
        .custom-notification.success .notification-icon {
            background: #10b981;
            color: white;
        }
        
        .custom-notification.error .notification-icon {
            background: #ef4444;
            color: white;
        }
        
        .custom-notification.info .notification-icon {
            background: #3b82f6;
            color: white;
        }
        
        .notification-message {
            flex: 1;
            color: #1f2937;
            font-size: 0.95rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #9ca3af;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
        }
        
        .notification-close:hover {
            color: #ef4444;
        }
        
        @keyframes slideIn {
            to {
                transform: translateX(0);
            }
        }
        
        @media (max-width: 640px) {
            .custom-notification {
                top: 10px;
                right: 10px;
                left: 10px;
                min-width: auto;
            }
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(500px)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ==================== STUDENTS DATA ====================
const studentsData = [
    { name: "Abdumoxtorova Farangizbonu", year: 2026, date: "25-dekabr 2025", image: "👧", certImage: "img/sertifikatlar/sertifikat Farangiz.jpg" },
    { name: "Ergashova Dilnura", year: 2026, date: "25-dekabr 2025", image: "👧", certImage: "img/sertifikatlar/sertifikat Dilnura.jpg" },
    { name: "Abdumuxtorova Farangizbonu", year: 2026, date: "25-dekabr 2025", image: "👧", certImage: "img/sertifikatlar/Screenshot 2026-01-15 193719.png" },
    { name: "Maxamadaliyeva Mehribon", year: 2026, date: "16 yanvar 2026", image: "👧", certImage: "img/sertifikatlar/Screenshot 2026-01-16 222632.png" },
    { name: "Akbaraliyeva Husnidaxon", year: 2026, date: "16-yanvar 2026", image: "👧", certImage: "img/sertifikatlar/Screenshot 2026-01-16 222916.png" },
    { name: "Xudoberdiyeva Muslimaxon", year: 2026, date: "16-yanvar 2026", image: "👧", certImage: "img/sertifikatlar/Screenshot 2026-01-16 223134.png" },
    { name: "Po'latov Abdullajon", year: 2026, date: "16-yanvar 2026", image: "👦", certImage: "img/sertifikatlar/Screenshot 2026-01-17 162800.png" },
    { name: "Nurmatova Laylo", year: 2023, date: "30 Avgust 2023", image: "👧", certImage: "img/sertifikatlar/laylo.jpg" },
    { name: "Ismoilov Akmal", year: 2022, date: "12 Sentabr 2022", image: "👦", certImage: "img/sertifikatlar/akmal.jpg" },
    { name: "Hasanova Gulnora", year: 2022, date: "8 Oktabr 2022", image: "👧", certImage: "img/sertifikatlar/gulnora.jpg" },
    { name: "Mahmudov Bobur", year: 2022, date: "15 Noyabr 2022", image: "👦", certImage: "img/sertifikatlar/bobur.jpg" },
    { name: "Eshonqulova Nigora", year: 2022, date: "20 Dekabr 2022", image: "👧", certImage: "img/sertifikatlar/nigora.jpg" },
    { name: "Valijonov Umid", year: 2021, date: "10 Yanvar 2021", image: "👦", certImage: "img/sertifikatlar/umid.jpg" },
    { name: "Qurbonova Shahzoda", year: 2021, date: "25 Fevral 2021", image: "👧", certImage: "img/sertifikatlar/shahzoda.jpg" },
    { name: "Aminov Davron", year: 2021, date: "14 Mart 2021", image: "👦", certImage: "img/sertifikatlar/davron.jpg" },
    { name: "Rustamova Feruza", year: 2024, date: "5 May 2024", image: "👧", certImage: "img/sertifikatlar/feruza.jpg" },
    { name: "Nematov Eldor", year: 2024, date: "18 Iyun 2024", image: "👦", certImage: "img/sertifikatlar/eldor.jpg" },
    { name: "Sharipova Malika", year: 2023, date: "7 Iyul 2023", image: "👧", certImage: "img/sertifikatlar/malika.jpg" }
];

// ==================== DOM ELEMENTS ====================
const loader = document.getElementById('loader');
const header = document.getElementById('header');
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
const studentsGrid = document.getElementById('studentsGrid');
const searchInput = document.getElementById('searchStudent');
const yearFilter = document.getElementById('yearFilter');
const certModal = document.getElementById('certModal');
const certClose = document.getElementById('certClose');
const paymentModal = document.getElementById('paymentModal');
const paymentClose = document.getElementById('paymentClose');
const successModal = document.getElementById('successModal');
const successBtn = document.getElementById('successBtn');
const registerForm = document.getElementById('registerForm');
const contactForm = document.getElementById('contactForm');
const paymentForm = document.getElementById('paymentForm');

// ==================== PHONE INPUT FORMATTING ====================
const regPhoneInput = document.getElementById('regPhone');
if (regPhoneInput) {
    regPhoneInput.value = '+998 ';
    regPhoneInput.addEventListener('input', function() {
        formatPhoneNumber(this);
    });
    regPhoneInput.addEventListener('focus', function() {
        if (this.value === '' || this.value === '+') {
            this.value = '+998 ';
        }
    });
}

const parentPhoneInput = document.getElementById('parentPhone');
if (parentPhoneInput) {
    parentPhoneInput.value = '+998 ';
    parentPhoneInput.addEventListener('input', function() {
        formatPhoneNumber(this);
    });
    parentPhoneInput.addEventListener('focus', function() {
        if (this.value === '' || this.value === '+') {
            this.value = '+998 ';
        }
    });
}

const contactPhoneInput = document.getElementById('contactPhone');
if (contactPhoneInput) {
    contactPhoneInput.value = '+998 ';
    contactPhoneInput.addEventListener('input', function() {
        formatPhoneNumber(this);
    });
    contactPhoneInput.addEventListener('focus', function() {
        if (this.value === '' || this.value === '+') {
            this.value = '+998 ';
        }
    });
}

// ==================== LOADER ====================
function hideLoader() {
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 800);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideLoader);
} else {
    hideLoader();
}

setTimeout(() => {
    if (loader) loader.classList.add('hidden');
}, 2000);

// ==================== HEADER SCROLL ====================
function handleScroll() {
    if (window.scrollY > 100) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll);

// ==================== MOBILE MENU ====================
if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// ==================== COUNTER ANIMATION ====================
function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target + '+';
        }
    };
    updateCounter();
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            animateCounter(entry.target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// ==================== STUDENTS SECTION ====================
function renderStudents(students) {
    if (!studentsGrid) return;
    studentsGrid.innerHTML = '';
    
    if (students.length === 0) {
        studentsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; font-size: 1.2rem; padding: 3rem;">Hech qanday natija topilmadi</p>`;
        return;
    }

    students.forEach((student, index) => {
        const card = document.createElement('div');
        card.className = 'student-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        card.innerHTML = `
            <div class="student-image">
                <span style="font-size: 5rem;">${student.image}</span>
                <div class="certificate-badge">Sertifikat</div>
            </div>
            <div class="student-info">
                <h3>${student.name}</h3>
                <p><i class="fas fa-calendar"></i> ${student.date}</p>
                <p><i class="fas fa-award"></i> ${student.year}-yil bitiruvchisi</p>
            </div>
        `;
        
        card.addEventListener('click', () => openCertificateModal(student));
        studentsGrid.appendChild(card);

        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function filterStudents() {
    if (!searchInput || !yearFilter) return;
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedYear = yearFilter.value;
    let filtered = studentsData;

    if (searchTerm) {
        filtered = filtered.filter(s => s.name.toLowerCase().includes(searchTerm));
    }
    if (selectedYear !== 'all') {
        filtered = filtered.filter(s => s.year.toString() === selectedYear);
    }
    renderStudents(filtered);
}

if (searchInput) searchInput.addEventListener('input', filterStudents);
if (yearFilter) yearFilter.addEventListener('change', filterStudents);
renderStudents(studentsData);

// ==================== CERTIFICATE MODAL ====================
function openCertificateModal(student) {
    if (!certModal) return;

    const modalImage = document.getElementById('modalImage');
    const modalName = document.getElementById('modalName');
    const modalDate = document.getElementById('modalDate');

    if (student.certImage) {
        if (modalImage) modalImage.src = student.certImage;
    } else {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createLinearGradient(0, 0, 800, 600);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 800, 600);

        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 12;
        ctx.strokeRect(25, 25, 750, 550);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(40, 40, 720, 520);

        ctx.fillStyle = 'white';
        ctx.font = 'bold 52px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('SERTIFIKAT', 400, 110);

        ctx.font = '26px Arial';
        ctx.fillText('Mental Arifmetika Kursi', 400, 160);

        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(250, 190);
        ctx.lineTo(550, 190);
        ctx.stroke();

        ctx.font = '22px Arial';
        ctx.fillText('Ushbu sertifikat', 400, 250);

        ctx.font = 'bold 40px Arial';
        ctx.fillStyle = '#f59e0b';
        ctx.fillText(student.name, 400, 310);

        ctx.fillStyle = 'white';
        ctx.font = '22px Arial';
        ctx.fillText('Mental arifmetika kursini', 400, 370);
        ctx.fillText('muvaffaqiyatli tamomlanganligi uchun', 400, 405);
        ctx.fillText('berildi', 400, 440);

        ctx.font = 'italic 20px Arial';
        ctx.fillText(student.date, 400, 490);

        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(280, 540);
        ctx.lineTo(520, 540);
        ctx.stroke();

        ctx.font = '18px Arial';
        ctx.fillText('Direktor imzosi', 400, 565);

        if (modalImage) modalImage.src = canvas.toDataURL();
    }

    if (modalName) modalName.textContent = student.name;
    if (modalDate) modalDate.textContent = student.date;

    certModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCertificateModal() {
    if (certModal) {
        certModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

if (certClose) certClose.addEventListener('click', closeCertificateModal);
if (certModal) {
    certModal.addEventListener('click', (e) => {
        if (e.target === certModal) closeCertificateModal();
    });
}

// ==================== PAYMENT MODAL ====================
let selectedPlan = null;

document.querySelectorAll('.select-plan').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.price-card');
        if (!card) return;

        selectedPlan = {
            name: card.dataset.plan,
            price: card.dataset.price
        };

        const selectedPlanInfo = document.getElementById('selectedPlanInfo');
        if (selectedPlanInfo) {
            selectedPlanInfo.innerHTML = `
                <h3>${selectedPlan.name} Tarif</h3>
                <p>${parseInt(selectedPlan.price).toLocaleString('uz-UZ')} so'm / oyiga</p>
            `;
        }

        if (paymentModal) {
            paymentModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

function closePaymentModal() {
    if (paymentModal) {
        paymentModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

if (paymentClose) paymentClose.addEventListener('click', closePaymentModal);
if (paymentModal) {
    paymentModal.addEventListener('click', (e) => {
        if (e.target === paymentModal) closePaymentModal();
    });
}

// ==================== CARD FORMATTING ====================
const cardNumberInput = document.getElementById('cardNumber');
if (cardNumberInput) {
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
        value = value.substring(0, 16);
        let formattedValue = value.match(/.{1,4}/g);
        e.target.value = formattedValue ? formattedValue.join(' ') : '';
    });
}

const cardExpiryInput = document.getElementById('cardExpiry');
if (cardExpiryInput) {
    cardExpiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            e.target.value = value.substring(0, 2) + '/' + value.substring(2, 4);
        } else {
            e.target.value = value;
        }
    });
}

const cardCVVInput = document.getElementById('cardCVV');
if (cardCVVInput) {
    cardCVVInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
    });
}

// ==================== PAYMENT FORM ====================
if (paymentForm) {
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!selectedPlan) {
            showNotification('Xatolik! Iltimos, tarifni qaytadan tanlang.', 'error');
            return;
        }

        const studentName = document.getElementById('studentName')?.value?.trim();
        const studentAge = document.getElementById('studentAge')?.value;
        const parentPhone = document.getElementById('parentPhone')?.value?.trim();
        const cardNumber = document.getElementById('cardNumber')?.value?.trim();
        const cardExpiry = document.getElementById('cardExpiry')?.value?.trim();
        const cardName = document.getElementById('cardName')?.value?.trim();
        const cardCVV = document.getElementById('cardCVV')?.value?.trim();

        if (!studentName || !validateName(studentName)) {
            showNotification('Iltimos, to\'g\'ri ism kiriting (kamida 3 ta harf)!', 'error');
            return;
        }

        if (!studentAge || !validateAge(studentAge)) {
            showNotification('Yosh 4 dan 18 gacha bo\'lishi kerak!', 'error');
            return;
        }

        if (!parentPhone || !validatePhone(parentPhone)) {
            showNotification('Telefon raqam noto\'g\'ri! Format: +998 XX XXX XX XX', 'error');
            return;
        }

        if (!cardNumber || !validateCard(cardNumber)) {
            showNotification('Karta raqami noto\'g\'ri! 16 ta raqam bo\'lishi kerak.', 'error');
            return;
        }

        if (!cardExpiry || !validateExpiry(cardExpiry)) {
            showNotification('Karta amal qilish muddati noto\'g\'ri yoki tugagan!', 'error');
            return;
        }

        if (!cardCVV || !validateCVV(cardCVV)) {
            showNotification('CVV kod noto\'g\'ri! 3 ta raqam bo\'lishi kerak.', 'error');
            return;
        }

        if (!cardName || !validateName(cardName)) {
            showNotification('Karta egasining ismini to\'g\'ri kiriting!', 'error');
            return;
        }

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yuborilmoqda...';
        submitBtn.disabled = true;

        const paymentData = {
            plan: selectedPlan.name,
            price: selectedPlan.price,
            studentName: studentName,
            studentAge: studentAge,
            studentGroup: document.getElementById('studentGroup')?.value || '',
            cardNumber: cardNumber.replace(/\s/g, '').substring(0, 4) + ' **** **** ' + cardNumber.replace(/\s/g, '').substring(12),
            cardExpiry: cardExpiry,
            cardName: cardName,
            parentPhone: parentPhone,
            date: new Date().toLocaleString('uz-UZ', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        console.log('📤 To\'lov ma\'lumotlari yuborilmoqda...', paymentData);

        emailjs.send(CONFIG.services.registration, CONFIG.templates.payment, paymentData)
            .then((response) => {
                console.log('✅ Email muvaffaqiyatli yuborildi!', response);
                showNotification('To\'lov muvaffaqiyatli qabul qilindi! Tez orada siz bilan bog\'lanamiz.', 'success');
                closePaymentModal();
                paymentForm.reset();
                if (parentPhoneInput) parentPhoneInput.value = '+998 ';
                selectedPlan = null;
            })
            .catch((error) => {
                console.error('❌ EmailJS xatolik:', error);
                showNotification('Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring yoki to\'g\'ridan-to\'g\'ri qo\'ng\'iroq qiling: ' + CONFIG.adminPhone, 'error');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

// ==================== REGISTER FORM ====================
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('regName')?.value?.trim();
        const phone = document.getElementById('regPhone')?.value?.trim();
        const age = document.getElementById('regAge')?.value;
        const group = document.getElementById('regGroup')?.value;

        if (!name || !validateName(name)) {
            showNotification('Iltimos, to\'g\'ri ism kiriting (kamida 3 ta harf)!', 'error');
            return;
        }

        if (!phone || !validatePhone(phone)) {
            showNotification('Telefon raqam noto\'g\'ri! Format: +998 XX XXX XX XX', 'error');
            return;
        }

        if (!age || !validateAge(age)) {
            showNotification('Yosh 4 dan 18 gacha bo\'lishi kerak!', 'error');
            return;
        }

        if (!group) {
            showNotification('Iltimos, guruhni tanlang!', 'error');
            return;
        }

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yuborilmoqda...';
        submitBtn.disabled = true;

        const registerData = {
            name: name,
            phone: phone,
            age: age,
            group: group,
            message: document.getElementById('regMessage')?.value || '',
            date: new Date().toLocaleString('uz-UZ', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        console.log('📤 Ro\'yxat ma\'lumotlari yuborilmoqda...', registerData);

        emailjs.send(CONFIG.services.registration, CONFIG.templates.register, registerData)
            .then((response) => {
                console.log('✅ Email muvaffaqiyatli yuborildi!', response);
                showNotification('Arizangiz qabul qilindi! Tez orada siz bilan bog\'lanamiz.', 'success');
                registerForm.reset();
                if (regPhoneInput) regPhoneInput.value = '+998 ';
            })
            .catch((error) => {
                console.error('❌ EmailJS xatolik:', error);
                showNotification('Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring yoki to\'g\'ridan-to\'g\'ri qo\'ng\'iroq qiling: ' + CONFIG.adminPhone, 'error');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

// ==================== CONTACT FORM ====================
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('contactName')?.value?.trim();
        const phone = document.getElementById('contactPhone')?.value?.trim();
        const email = document.getElementById('contactEmail')?.value?.trim();
        const message = document.getElementById('contactMessage')?.value?.trim();

        if (!name || !validateName(name)) {
            showNotification('Iltimos, to\'g\'ri ism kiriting (kamida 3 ta harf)!', 'error');
            return;
        }

        if (!phone || !validatePhone(phone)) {
            showNotification('Telefon raqam noto\'g\'ri! Format: +998 XX XXX XX XX', 'error');
            return;
        }

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showNotification('Email manzil noto\'g\'ri!', 'error');
            return;
        }

        if (!message || message.length < 10) {
            showNotification('Xabar kamida 10 ta belgidan iborat bo\'lishi kerak!', 'error');
            return;
        }

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yuborilmoqda...';
        submitBtn.disabled = true;

        const contactData = {
            name: name,
            phone: phone,
            email: email || 'Kiritilmagan',
            message: message,
            date: new Date().toLocaleString('uz-UZ', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        console.log('📤 Xabar yuborilmoqda...', contactData);

        emailjs.send(CONFIG.services.contact, CONFIG.templates.contact, contactData)
            .then((response) => {
                console.log('✅ Email muvaffaqiyatli yuborildi!', response);
                showNotification('Xabaringiz yuborildi! Tez orada javob beramiz.', 'success');
                contactForm.reset();
                if (contactPhoneInput) contactPhoneInput.value = '+998 ';
            })
            .catch((error) => {
                console.error('❌ EmailJS xatolik:', error);
                showNotification('Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring yoki to\'g\'ridan-to\'g\'ri qo\'ng\'iroq qiling: ' + CONFIG.adminPhone, 'error');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

// ==================== SUCCESS MODAL ====================
function showSuccessModal(message) {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) successMessage.textContent = message;
    if (successModal) {
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSuccessModal() {
    if (successModal) {
        successModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

if (successBtn) successBtn.addEventListener('click', closeSuccessModal);
if (successModal) {
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) closeSuccessModal();
    });
}

// ==================== FLOATING SOCIAL BUTTONS ====================
function createFloatingSocialButtons() {
    const existingFloating = document.querySelector('.floating-social');
    if (existingFloating) return;

    const floatingSocial = document.createElement('div');
    floatingSocial.className = 'floating-social';
    floatingSocial.innerHTML = `
        <a href="https://wa.me/998993490405" class="social-float whatsapp" target="_blank" rel="noopener noreferrer" title="WhatsApp">
            <i class="fab fa-whatsapp"></i>
        </a>
        <a href="https://t.me/+998993490405" class="social-float telegram" target="_blank" rel="noopener noreferrer" title="Telegram">
            <i class="fab fa-telegram"></i>
        </a>
        <a href="https://www.instagram.com/asadbek_mavrulbekov1?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" class="social-float instagram" target="_blank" rel="noopener noreferrer" title="Instagram">
            <i class="fab fa-instagram"></i>
        </a>
    `;
    document.body.appendChild(floatingSocial);
}

createFloatingSocialButtons();

// ==================== SCROLL TO TOP BUTTON ====================
function createScrollTopButton() {
    const existingBtn = document.querySelector('.scroll-top');
    if (existingBtn) return;

    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.setAttribute('aria-label', 'Yuqoriga qaytish');
    document.body.appendChild(scrollTopBtn);

    function toggleScrollButton() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleScrollButton);
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

createScrollTopButton();

// ==================== INTERSECTION OBSERVER ====================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const animatedSections = document.querySelectorAll('.about, .prices, .register, .contact');
animatedSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(40px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
});

// ==================== PRICE CARD INTERACTIONS ====================
const priceCards = document.querySelectorAll('.price-card');
priceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (this.classList.contains('featured')) {
            this.style.transform = 'scale(1.05) translateY(-15px)';
        } else {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (this.classList.contains('featured')) {
            this.style.transform = 'scale(1.05)';
        } else {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// ==================== PARALLAX EFFECT ====================
let ticking = false;

function updateParallax() {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('.floating-card, .benefit-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.3;
        const yPos = -(scrolled * speed) / 100;
        element.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ==================== LAZY LOADING IMAGES ====================
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            imageObserver.unobserve(img);
        }
    });
}, {
    rootMargin: '50px'
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ==================== KEYBOARD ACCESSIBILITY ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (certModal?.classList.contains('active')) {
            closeCertificateModal();
        }
        if (paymentModal?.classList.contains('active')) {
            closePaymentModal();
        }
        if (successModal?.classList.contains('active')) {
            closeSuccessModal();
        }
    }
});

// ==================== PERFORMANCE OPTIMIZATION ====================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const optimizedScrollHandler = debounce(handleScroll, 10);
window.addEventListener('scroll', optimizedScrollHandler);

// ==================== ERROR BOUNDARY ====================
window.addEventListener('error', (event) => {
    console.error('🚨 Global Error:', event.error);
    showNotification('Kutilmagan xatolik yuz berdi. Sahifani yangilang.', 'error');
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('🚨 Unhandled Promise Rejection:', event.reason);
});

// ==================== CONSOLE WELCOME MESSAGE ====================
console.log('%c🎓 Mental Arifmetika O\'quv Markazi', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%c✅ JavaScript to\'liq yuklandi!', 'font-size: 14px; color: #10b981;');
console.log('%cDasturchi: Professional Web Developer', 'font-size: 12px; color: #6b7280;');
console.log('%cBarcha funksiyalar ishga tushdi! 🚀', 'font-size: 12px; color: #6b7280;');

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM to\'liq yuklandi');
    
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS yuklanmadi! Formalar ishlamaydi.');
        showNotification('Email xizmat mavjud emas. Iltimos, to\'g\'ridan-to\'g\'ri qo\'ng\'iroq qiling.', 'error');
    }
});

console.log('✅ Mental Arifmetika - JavaScript MUKAMMAL TAYYOR!');