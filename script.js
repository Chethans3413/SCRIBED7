// ============================================
// AGENCY7 – JavaScript Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Smooth scroll for all anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Scroll Down Button ----
  const scrollBtn = document.querySelector('.scroll-btn');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    });
  }

  // ---- Language Selector Toggle ----
  const langSelector = document.querySelector('.lang-selector');
  if (langSelector) {
    langSelector.addEventListener('click', () => {
      const langs = ['NL', 'EN', 'FR', 'DE'];
      const current = langSelector.textContent.trim().split(' ')[0];
      const idx = langs.indexOf(current);
      const next = langs[(idx + 1) % langs.length];
      langSelector.innerHTML = `${next} <span class="lang-arrow">∨</span>`;
    });
  }

  // ---- Photo cards: subtle parallax on mouse move ----
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const cards = hero.querySelectorAll('.card');
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      cards.forEach((card, i) => {
        const depth = (i % 3 + 1) * 3;
        card.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
      });
    });

    hero.addEventListener('mouseleave', () => {
      const cards = hero.querySelectorAll('.card');
      cards.forEach(card => {
        card.style.transform = '';
        card.style.transition = 'transform 0.6s ease';
      });
    });
  }

  // ---- Navbar: sticky highlight on scroll ----
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const isLightNav = navbar.classList.contains('light-nav');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        navbar.style.borderBottomColor = isLightNav ? 'rgba(0, 44, 243, 0.15)' : 'rgba(255,255,255,0.15)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.background = isLightNav ? 'rgba(242, 245, 251, 0.92)' : 'rgba(18,18,204,0.92)';
      } else {
        navbar.style.borderBottomColor = isLightNav ? 'rgba(0, 44, 243, 0.08)' : 'rgba(255,255,255,0.08)';
        navbar.style.backdropFilter = 'none';
        navbar.style.background = isLightNav ? '#f2f5fb' : '#1212CC';
      }
    });
  }

  // ---- Entrance animation (stagger) ----
  const animEls = [
    document.querySelector('.who-we-are'),
    document.querySelector('.headline'),
    document.querySelector('.sub-text'),
    document.querySelector('.explore-link'),
    document.querySelector('.scroll-btn'),
  ].filter(Boolean);

  animEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`;
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      animEls.forEach(el => {
        el.style.opacity = '';
        el.style.transform = '';
      });
    });
  });

  // ---- Trophies & Triumphs Section: Interactive Awards Tabs ----
  const ttTabs = document.querySelectorAll('.tt-tab');
  ttTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (!tab.classList.contains('active')) {
        ttTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      }
    });
  });

  // ---- Services Section: Vertical Slider ----
  const serviceItems = document.querySelectorAll('.slider-wrapper .service-item');
  if (serviceItems.length) {
    let activeIndex = 2; // Start with the middle item (index 2) active
    const total = serviceItems.length;
    
    function updatePositions() {
      serviceItems.forEach((item, index) => {
        // Calculate shortest distance in a circular array
        let dist = index - activeIndex;
        // Wrap around logic for 5 items
        if (dist < -2) dist += 5;
        if (dist > 2) dist -= 5;
        
        // Remove old pos-* classes
        item.className = 'service-item'; 
        
        // Add new class based on distance
        if (dist === 0) item.classList.add('pos-0');
        else if (dist === 1) item.classList.add('pos-1');
        else if (dist === -1) item.classList.add('pos-minus-1');
        else if (dist === 2) item.classList.add('pos-2');
        else if (dist === -2) item.classList.add('pos-minus-2');
      });
    }

    // Initial render
    updatePositions();

    // Slide every 2 seconds (1s pause + 1s transition)
    setInterval(() => {
      activeIndex = (activeIndex + 1) % total;
      updatePositions();
    }, 2000);
  }
  // ---- Scroll-Reveal Animation System ----
  // Auto-tag sections and key elements with data-reveal
  const revealSections = [
    '.script-section',
    '.services-section',
    '.work-section',
    '.chandi-section',
    '.hacked-section',
    '.web-section',
    '.vs-section',
    '.tt-wrap',
    '.testi-wrap',
    '.unanswered-wrap',
    '#contact-section',
    // Sub-pages
    '.unanswered-page-content',
    '.contact-page-wrap'
  ];

  revealSections.forEach(selector => {
    const el = document.querySelector(selector);
    if (el && !el.hasAttribute('data-reveal')) {
      el.setAttribute('data-reveal', 'fade-up');
    }
  });

  // Tag individual elements for stagger within sections
  const staggerGroups = [
    { parent: '.chandi-grid', children: '.chandi-item', type: 'zoom-in' },
    { parent: '.vs-cards', children: '.vs-card', type: 'fade-up' },
    { parent: '.web-grid', children: '.web-col-left, .web-col-right', type: 'fade-up' },
    { parent: '.hacked-grid', children: '.grid-box', type: 'fade-up' },
    { parent: '.tt-results-grid', children: '.tt-stat-col, .tt-checklist-col', type: 'fade-up' },
    { parent: '.work-content', children: '.work-left, .work-right', type: 'fade-up' },
    { parent: '.testi-container', children: '.testi-media-col, .testi-quote-col', type: 'fade-up' }
  ];

  staggerGroups.forEach(group => {
    const parent = document.querySelector(group.parent);
    if (parent) {
      const kids = parent.querySelectorAll(group.children);
      kids.forEach((kid, i) => {
        if (!kid.hasAttribute('data-reveal')) {
          kid.setAttribute('data-reveal', group.type);
          kid.setAttribute('data-reveal-delay', String(Math.min(i + 1, 6)));
        }
      });
    }
  });

  // IntersectionObserver to trigger reveals
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  });

  document.querySelectorAll('[data-reveal]').forEach(el => {
    revealObserver.observe(el);
  });

});


// ---- Mobile Menu Toggle ----
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navbarMobile = document.querySelector('.navbar');
  const navLinksMobile = document.querySelectorAll('.nav-links a, .cta-button');

  if (hamburger && navbarMobile) {
    hamburger.addEventListener('click', () => {
      navbarMobile.classList.toggle('mobile-active');
      if (navbarMobile.classList.contains('mobile-active')) {
        hamburger.textContent = '✕';
      } else {
        hamburger.textContent = '☰';
      }
    });

    navLinksMobile.forEach(link => {
      link.addEventListener('click', () => {
        navbarMobile.classList.remove('mobile-active');
        hamburger.textContent = '☰';
      });
    });
  }
});
