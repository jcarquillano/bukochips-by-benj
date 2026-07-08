// ============================================================
// 1. LENIS SMOOTH SCROLL
// ============================================================
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ============================================================
// 2. LOADING SCREEN
// ============================================================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 1200);
    }, 900);
});

// ============================================================
// 3. NAVIGATION STICKY + GLASS
// ============================================================
const navbar = document.getElementById('navbar');
const hero = document.querySelector('.hero');
const menuToggle = document.getElementById('menuToggle');

function handleSticky() {
    const scrollY = window.scrollY;
    if (scrollY > hero.offsetHeight * 0.4) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
}
window.addEventListener('scroll', handleSticky);
window.addEventListener('resize', handleSticky);

// ============================================================
// 4. MOBILE MENU
// ============================================================
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = menuToggle.querySelector('i');
    icon.className = navLinks.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.querySelector('i').className = 'fas fa-bars';
    });
});

// ============================================================
// 5. HERO PARTICLES
// ============================================================
(function createParticles() {
    const container = document.getElementById('heroParticles');
    for (let i = 0; i < 40; i++) {
        const span = document.createElement('span');
        const size = 2 + Math.random() * 4;
        span.style.width = size + 'px';
        span.style.height = size + 'px';
        span.style.left = Math.random() * 100 + '%';
        span.style.animationDelay = Math.random() * 10 + 's';
        span.style.animationDuration = 8 + Math.random() * 12 + 's';
        span.style.opacity = 0.1 + Math.random() * 0.2;
        container.appendChild(span);
    }
})();

// ============================================================
// 6. PRODUCT DATA & THEMES
// ============================================================
const products = [{
    id: 'original',
    name: 'Original',
    desc: 'The classic crunch that started it all.',
    img: 'https://cdn.corenexis.com/f/zNFh2xVmGLL.png',
    theme: {
        bg: '#faf7f2',
        text: '#1e1a14',
        accent: '#f5c542',
        navColor: '#1e1a14',
        glowColor: 'rgba(245, 197, 66, 0.5)',
        darkBg: 'rgba(0,0,0,0.08)',
    }
}, {
    id: 'dark-chocolate',
    name: 'Dark Chocolate',
    desc: 'Rich, indulgent, and deeply satisfying.',
    img: 'https://cdn.corenexis.com/f/qOpB68W7VmE.png',
    theme: {
        bg: '#1a1410',
        text: '#f5ede3',
        accent: '#d4a050',
        navColor: '#f5ede3',
        glowColor: 'rgba(212, 160, 80, 0.5)',
        darkBg: 'rgba(0,0,0,0.3)',
    }
}, {
    id: 'white-chocolate',
    name: 'White Chocolate',
    desc: 'Creamy, sweet, and utterly luxurious.',
    img: 'https://cdn.corenexis.com/f/CGJSXjN9RW2.png',
    theme: {
        bg: '#f8f4ef',
        text: '#1e1a14',
        accent: '#e8d5b8',
        navColor: '#1e1a14',
        glowColor: 'rgba(232, 213, 184, 0.5)',
        darkBg: 'rgba(0,0,0,0.05)',
    }
}, {
    id: 'matcha',
    name: 'Matcha',
    desc: 'Earthy, vibrant, and Japanese-inspired.',
    img: 'https://cdn.corenexis.com/f/f7NbwPAbaC6.png',
    theme: {
        bg: '#1e2a1a',
        text: '#e8f0e0',
        accent: '#7cb342',
        navColor: '#e8f0e0',
        glowColor: 'rgba(124, 179, 66, 0.5)',
        darkBg: 'rgba(0,0,0,0.25)',
    }
}, {
    id: 'strawberry',
    name: 'Strawberry',
    desc: 'Sweet, fruity, and full of summer vibes.',
    img: 'https://cdn.corenexis.com/f/rLdxA6GBVoC.png',
    theme: {
        bg: '#fce4ec',
        text: '#4a1a2a',
        accent: '#e57373',
        navColor: '#4a1a2a',
        glowColor: 'rgba(229, 115, 115, 0.5)',
        darkBg: 'rgba(0,0,0,0.06)',
    }
}, {
    id: 'ube',
    name: 'Ube',
    desc: 'Purple, creamy, and uniquely Filipino.',
    img: 'https://cdn.corenexis.com/f/oxcVj1OlWXv.png',
    theme: {
        bg: '#1a1028',
        text: '#f0e8f8',
        accent: '#9c5cb0',
        navColor: '#f0e8f8',
        glowColor: 'rgba(156, 92, 176, 0.5)',
        darkBg: 'rgba(0,0,0,0.3)',
    }
}, {
    id: 'buko-thins',
    name: 'Buko Thins',
    desc: 'Light, crispy, and irresistibly snackable.',
    img: 'https://cdn.corenexis.com/f/vDLYA8cOgOX.png',
    theme: {
        bg: '#f5efe8',
        text: '#1e1a14',
        accent: '#c9b09b',
        navColor: '#1e1a14',
        glowColor: 'rgba(201, 176, 155, 0.5)',
        darkBg: 'rgba(0,0,0,0.05)',
    }
}];

// ============================================================
// 7. RENDER PRODUCT SLIDES
// ============================================================
const track = document.getElementById('productTrack');
const dotsContainer = document.getElementById('productDots');
let currentIndex = 0;

const bgOverlay = document.createElement('div');
bgOverlay.className = 'bg-overlay';
document.querySelector('.product-experience').appendChild(bgOverlay);

products.forEach((p, i) => {
    const slide = document.createElement('div');
    slide.className = 'product-slide' + (i === 0 ? ' active' : '');
    slide.dataset.index = i;
    slide.innerHTML = `
        <div class="product-img-wrapper">
            <img class="product-img" src="${p.img}" alt="${p.name}" />
        </div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
    `;
    track.appendChild(slide);

    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.dataset.index = i;
    dot.addEventListener('click', () => goToProduct(i));
    dotsContainer.appendChild(dot);
});

// ============================================================
// 8. PRODUCT NAVIGATION
// ============================================================
const carouselWrap = document.getElementById('productCarousel');
const slides = track.querySelectorAll('.product-slide');

function clearGlowEffects() {
    document.querySelectorAll('.product-img-wrapper').forEach(wrapper => {
        wrapper.style.boxShadow = 'none';
        wrapper.style.background = 'none';
    });
}

function applyTheme(theme) {
    const exp = document.querySelector('.product-experience');
    const title = document.getElementById('productTitle');
    const sub = document.getElementById('productSub');
    const overlay = document.querySelector('.bg-overlay');

    exp.style.background = theme.bg;
    exp.style.color = theme.text;
    title.style.color = theme.text;
    sub.style.color = theme.text;

    overlay.style.background = theme.darkBg || 'rgba(0,0,0,0.1)';
    overlay.style.opacity = '1';

    document.querySelectorAll('.nav-links a:not(.reseller-cta)').forEach(a => {
        a.style.color = theme.navColor;
    });
    menuToggle.style.color = theme.navColor;
    
    document.querySelectorAll('.dot').forEach(d => {
        d.style.background = theme.accent + '44';
    });
    document.querySelectorAll('.dot.active').forEach(d => {
        d.style.background = theme.accent;
    });
    
    document.querySelectorAll('.product-name').forEach(el => {
        el.style.color = theme.text;
    });
    document.querySelectorAll('.product-desc').forEach(el => {
        el.style.color = theme.text + '99';
    });
}

function goToProduct(index) {
    if (index < 0) index = 0;
    if (index >= products.length) index = products.length - 1;
    currentIndex = index;

    clearGlowEffects();
    const product = products[index];

    slides.forEach((s, i) => {
        s.classList.toggle('active', i === index);
    });

    document.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === index);
    });

    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('productSub').textContent = product.desc;

    applyTheme(product.theme);

    const activeSlide = slides[index];
    const imgWrapper = activeSlide.querySelector('.product-img-wrapper');
    
    const glowColor = product.theme.glowColor || 'rgba(245, 197, 66, 0.4)';
    imgWrapper.style.boxShadow = `0 0 80px 40px ${glowColor}`;
    imgWrapper.style.background = `radial-gradient(circle, ${glowColor.replace('0.5', '0.15')} 0%, transparent 70%)`;

    // Fixed alignment math relative to parent element wrap coordinates
    const containerWidth = carouselWrap.offsetWidth;
    const slideOffsetLeft = activeSlide.offsetLeft;
    const slideWidth = activeSlide.offsetWidth;
    const targetX = -(slideOffsetLeft - (containerWidth / 2) + (slideWidth / 2));
    
    gsap.to(track, {
        x: targetX,
        duration: 0.8,
        ease: 'power3.inOut',
        overwrite: 'auto',
    });
}

// --- DRAG / TOUCH ALIGNED SWIPE FIX ---
let isDraggingProduct = false;
let startX = 0;
let slideTriggered = false;

carouselWrap.addEventListener('mousedown', (e) => {
    isDraggingProduct = true;
    slideTriggered = false;
    startX = e.clientX;
    carouselWrap.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (e) => {
    if (!isDraggingProduct || slideTriggered) return;
    const diff = e.clientX - startX;
    
    // Fixed: Jump logic threshold triggers exactly once per swipe action
    if (Math.abs(diff) > 75) {
        slideTriggered = true;
        if (diff > 0 && currentIndex > 0) {
            goToProduct(currentIndex - 1);
        } else if (diff < 0 && currentIndex < products.length - 1) {
            goToProduct(currentIndex + 1);
        }
    }
});

window.addEventListener('mouseup', () => {
    isDraggingProduct = false;
    carouselWrap.style.cursor = 'grab';
});

let touchStartX = 0;
let touchTriggered = false;

carouselWrap.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchTriggered = false;
}, { passive: true });

carouselWrap.addEventListener('touchmove', (e) => {
    if (touchTriggered) return;
    const diff = e.touches[0].clientX - touchStartX;
    
    if (Math.abs(diff) > 55) {
        touchTriggered = true;
        if (diff > 0 && currentIndex > 0) {
            goToProduct(currentIndex - 1);
        } else if (diff < 0 && currentIndex < products.length - 1) {
            goToProduct(currentIndex + 1);
        }
    }
}, { passive: true });

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goToProduct(currentIndex + 1);
    if (e.key === 'ArrowLeft') goToProduct(currentIndex - 1);
});

// ============================================================
// 9. GSAP + SCROLLTRIGGER ANIMATIONS
// ============================================================
gsap.registerPlugin(ScrollTrigger, Draggable);

gsap.from('.hero-content h1', {
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
    opacity: 0.6,
    y: 40,
    scale: 0.98,
    ease: 'power2.out',
});

const aboutH2 = document.querySelector('.about-section h2');
if (aboutH2) {
    const split = new SplitType(aboutH2, { types: 'lines,words' });
    gsap.from(split.words, {
        scrollTrigger: { trigger: '.about-section', start: 'top 80%', toggleActions: 'play none none reverse' },
        opacity: 0,
        y: 30,
        stagger: 0.04,
        duration: 0.8,
        ease: 'power3.out',
    });
}

const whyTextItems = document.querySelectorAll('.why-text-item');
whyTextItems.forEach((item) => {
    gsap.to(item, {
        scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none reverse' },
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        onComplete: () => item.classList.add('visible'),
    });
});

document.querySelectorAll('.gallery-item').forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none reverse' },
        opacity: 0,
        scale: 0.92,
        duration: 0.7,
        delay: i * 0.1,
        ease: 'power2.out',
    });
});

// ============================================================
// 10. FAQ - CLICK TO TOGGLE
// ============================================================
document.querySelectorAll('.faq-item').forEach((item) => {
    gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 95%', toggleActions: 'play none none reverse' },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
    });
    
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const parent = this.closest('.faq-item');
        parent.classList.toggle('open');
    });
});

// ============================================================
// 11. REVIEWS - AUTO LOOPING SCROLL
// ============================================================
const reviewsData = [
    {
        stars: '★★★★★',
        text: '"Masarap siya! One customer even called us back after we had already left just to buy more packs."',
        author: '— Maria R.'
    },
    {
        stars: '★★★★★',
        text: '"The White Chocolate is my favorite! So creamy and crunchy at the same time."',
        author: '— James L.'
    },
    {
        stars: '★★★★★',
        text: '"Crispy, addicting, and worth every peso. Perfect for movie nights."',
        author: '— Angela T.'
    },
    {
        stars: '★★★★★',
        text: '"Perfect pasalubong and snack while studying. My classmates love it!"',
        author: '— Carlo M.'
    }
];

const reviewsTrack = document.getElementById('reviewsTrack');

function createReviewCard(data) {
    const card = document.createElement('div');
    card.className = 'review-card';
    card.innerHTML = `
        <div class="stars">${data.stars}</div>
        <div class="review-text">${data.text}</div>
        <div class="review-author">${data.author}</div>
    `;
    return card;
}

reviewsData.forEach(data => {
    reviewsTrack.appendChild(createReviewCard(data));
});
reviewsData.forEach(data => {
    reviewsTrack.appendChild(createReviewCard(data));
});

// ============================================================
// 12. CONTACT FORM
// ============================================================
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const mailtoLink = `mailto:Bukochipsbybenj@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
    )}`;

    window.location.href = mailtoLink;

    const btn = this.querySelector('.btn-primary');
    const originalText = btn.textContent;
    btn.textContent = '✅ Opening Email...';
    btn.style.background = '#4CAF50';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 3000);

    this.reset();
});

// ============================================================
// 13. PRODUCT MOUSE TILT (Disabled while dragging to prevent stutter)
// ============================================================
document.addEventListener('mousemove', (e) => {
    if (isDraggingProduct) return;
    const activeImg = document.querySelector('.product-slide.active .product-img');
    if (!activeImg) return;
    const rect = activeImg.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateY = x * 8;
    const rotateX = -y * 8;
    gsap.to(activeImg, {
        rotationY: rotateY,
        rotationX: rotateX,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
    });
});

document.addEventListener('mouseleave', () => {
    const activeImg = document.querySelector('.product-slide.active .product-img');
    if (activeImg) {
        gsap.to(activeImg, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.8,
            ease: 'power2.out',
        });
    }
});

// ============================================================
// 14. INIT
// ============================================================
goToProduct(0);

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        goToProduct(currentIndex);
    }, 200);
});

console.log('🍃 Buko Chips by Benj — premium experience loaded.');