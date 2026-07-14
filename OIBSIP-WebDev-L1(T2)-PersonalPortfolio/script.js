// ===== TYPED TEXT EFFECT =====
const roles = ['Web Developer', 'CS Engineer', 'Programmer', 'Problem Solver'];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeEffect() {
  const current = roles[roleIndex];
  if (isDeleting) {
    charIndex--;
    typedEl.textContent = current.substring(0, charIndex);
    // Bug fix: check AFTER decrement, not with post-decrement inline
    if (charIndex <= 0) {
      isDeleting = false;
      charIndex = 0;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 400);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, charIndex);
    charIndex++;
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  }
  setTimeout(typeEffect, isDeleting ? 60 : 100);
}
typeEffect();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
  highlightNav();
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
hamburger.addEventListener('keydown', e => { if (e.key === 'Enter') hamburger.click(); });

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
function highlightNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

// ===== SCROLL TO TOP =====
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== REVEAL ON SCROLL =====
const revealEls = document.querySelectorAll('.glass-card, .timeline-item, .stat-item, .section-header');
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// ===== SKILL BAR ANIMATION =====
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar').forEach(bar => bar.classList.add('animated'));
      skillObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skills-section').forEach(s => skillObs.observe(s));

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + suffix;
    if (current >= target) clearInterval(timer);
  }, 16);
}

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
      counterObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.about-stats').forEach(s => counterObs.observe(s));

// ===== PARTICLES =====
// Bug fix: Each particle gets its OWN unique keyframe name so they move independently
const particlesContainer = document.getElementById('particles');
const allParticleStyles = [];

for (let i = 0; i < 30; i++) {
  const size = Math.random() * 3 + 1;
  const animName = `pFloat${i}`;
  const x1 = (Math.random() * 60 - 30).toFixed(1);
  const y1 = (Math.random() * 60 - 30).toFixed(1);
  const x2 = (Math.random() * 60 - 30).toFixed(1);
  const y2 = (Math.random() * 60 - 30).toFixed(1);

  allParticleStyles.push(`@keyframes ${animName} {
    0%,100%{transform:translate(0,0);}
    33%{transform:translate(${x1}px,${y1}px);}
    66%{transform:translate(${x2}px,${y2}px);}
  }`);

  const p = document.createElement('div');
  p.style.cssText = `
    position:absolute;
    width:${size}px; height:${size}px;
    background:rgba(56,189,248,${(Math.random() * 0.4 + 0.1).toFixed(2)});
    border-radius:50%;
    top:${(Math.random() * 100).toFixed(1)}%;
    left:${(Math.random() * 100).toFixed(1)}%;
    animation:${animName} ${(Math.random() * 10 + 8).toFixed(1)}s ease-in-out infinite;
    animation-delay:${(Math.random() * 5).toFixed(1)}s;
    pointer-events:none;
  `;
  particlesContainer.appendChild(p);
}

// Inject all keyframes in one style tag
const styleTag = document.createElement('style');
styleTag.textContent = allParticleStyles.join('\n');
document.head.appendChild(styleTag);

// ===== SMOOTH HOVER TILT on project cards =====
// Bug fix: add perspective to parent so rotateX/Y actually renders in 3D
document.querySelectorAll('.project-card').forEach(card => {
  card.style.transformStyle = 'preserve-3d';

  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) translateY(-4px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== CERTIFICATE LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');

document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('.cert-img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { lightboxImg.src = ''; }, 350);
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
