// Language toggle
const savedLang = localStorage.getItem('lang') || 'ar';
applyLang(savedLang);

function applyLang(lang) {
  const html = document.documentElement;
  html.classList.remove('lang-ar', 'lang-en');
  html.classList.add('lang-' + lang);
  html.dir = lang === 'en' ? 'ltr' : 'rtl';
  html.lang = lang;
  localStorage.setItem('lang', lang);
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = lang === 'ar' ? 'EN' : 'ع';
}

document.getElementById('langToggle')?.addEventListener('click', () => {
  const current = localStorage.getItem('lang') || 'ar';
  applyLang(current === 'ar' ? 'en' : 'ar');
});

// Header scroll shadow
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Animated counters
function animateCounter(el) {
  const raw = el.dataset.count;
  const isPlus = raw.endsWith('+');
  const target = parseInt(raw.replace('+', ''));
  const duration = 1800;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(eased * target);
    el.textContent = value + (isPlus ? '+' : '');
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = '1';
      animateCounter(entry.target);
    }
  });
}, { threshold: .5 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const mobileOverlay = document.querySelector('.mobile-overlay');

function toggleMenu(open) {
  const isOpen = open !== undefined ? open : !hamburger.classList.contains('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileNav.classList.toggle('open', isOpen);
  mobileOverlay.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

if (hamburger) {
  hamburger.addEventListener('click', () => toggleMenu());
  mobileOverlay.addEventListener('click', () => toggleMenu(false));
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
}

// Projects filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('[data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    projectCards.forEach(card => {
      const show = cat === 'all' || card.dataset.category === cat;
      card.style.opacity = '0';
      card.style.transform = 'translateY(12px)';
      setTimeout(() => {
        card.style.display = show ? '' : 'none';
        if (show) {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'none';
          }, 20);
        }
      }, 200);
    });
  });
});
