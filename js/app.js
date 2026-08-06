/**
 * KAITO — Master Interactive Script for Feline Intelligence
 * Provides: Theme Switcher, Scroll Observer, Interactive Showcase Tabs, 
 * Pricing Calculator, Accordion FAQ, Live Terminal Typing, Toast Alerts.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initThemeToggle();
  initStickyHeader();
  initMobileNav();
  initScrollAnimations();
  initShowcaseTabs();
  initPricingToggle();
  initFaqAccordion();
  initTerminalTyping();
  initFormHandler();
});

/* --------------------------------------------------------------------------
   1. THEME ENGINE (LIGHT & DARK MODE)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  
  // Check stored theme or system preference
  const savedTheme = localStorage.getItem('aether-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    setTheme('dark');
  } else {
    setTheme('light');
  }
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }
  
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('aether-theme', theme);
    
    if (sunIcon && moonIcon) {
      if (theme === 'dark') {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      }
    }
  }
}

/* --------------------------------------------------------------------------
   2. STICKY HEADER & SCROLL STATE
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   3. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const navLinks = document.getElementById('nav-links');
  
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const isOpen = navLinks.classList.contains('mobile-open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });
    
    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   4. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in-up');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });
  
  animatedElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   5. PRODUCT SHOWCASE TAB SWITCHER
   -------------------------------------------------------------------------- */
function initShowcaseTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      
      // Update Tab Buttons Active State
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update Tab Panels Active State
      tabPanels.forEach(panel => {
        if (panel.id === `tab-${targetTab}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. PRICING BILLING TOGGLE (MONTHLY vs ANNUAL)
   -------------------------------------------------------------------------- */
function initPricingToggle() {
  const billingToggle = document.getElementById('billing-toggle');
  const priceStarter = document.getElementById('price-starter');
  const pricePro = document.getElementById('price-pro');
  const priceEnterprise = document.getElementById('price-enterprise');
  
  if (!billingToggle) return;
  
  let isAnnual = false;
  
  billingToggle.addEventListener('click', () => {
    isAnnual = !isAnnual;
    billingToggle.classList.toggle('active', isAnnual);
    
    if (isAnnual) {
      // 20% discount rates
      if (priceStarter) priceStarter.textContent = '31';
      if (pricePro) pricePro.textContent = '95';
      if (priceEnterprise) priceEnterprise.textContent = '319';
    } else {
      // Standard monthly rates
      if (priceStarter) priceStarter.textContent = '39';
      if (pricePro) pricePro.textContent = '119';
      if (priceEnterprise) priceEnterprise.textContent = '399';
    }
  });
}

/* --------------------------------------------------------------------------
   7. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other open FAQ items for clean accordion UX
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      
      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. HERO TERMINAL STREAMING SIMULATION (KAITO CAT EDITION)
   -------------------------------------------------------------------------- */
function initTerminalTyping() {
  const terminalElement = document.getElementById('terminal-live-text');
  if (!terminalElement) return;
  
  const consoleLines = [
    'KAITO.init({ cat: "Luna 🐱", mood: "Super Feliz" })',
    'Colar Smart Kaito conectado. Ronronados: 120 bpm.',
    'Miau traduzido: "Hora do sachê de salmão!"',
    'Rede Kaito Feline Mesh ativa [99.98% felicidade].'
  ];
  
  let lineIndex = 0;
  let charIndex = 0;
  
  function typeNextChar() {
    if (lineIndex >= consoleLines.length) {
      lineIndex = 0;
      charIndex = 0;
      terminalElement.textContent = '> ';
      setTimeout(typeNextChar, 2000);
      return;
    }
    
    const currentLine = consoleLines[lineIndex];
    terminalElement.textContent = '> ' + currentLine.substring(0, charIndex + 1);
    charIndex++;
    
    if (charIndex < currentLine.length) {
      setTimeout(typeNextChar, 35);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNextChar, 1800);
    }
  }
  
  setTimeout(typeNextChar, 800);
}

/* --------------------------------------------------------------------------
   9. FORM HANDLING & TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function initFormHandler() {
  const ctaForm = document.getElementById('cta-form');
  const toast = document.getElementById('toast-notification');
  
  if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = ctaForm.querySelector('input[type="email"]');
      
      if (emailInput && emailInput.value.trim()) {
        showToast('✨ Oun! Kit inicial KAITO enviado com sucesso para ' + emailInput.value);
        emailInput.value = '';
      } else {
        showToast('Por favor, digite um e-mail válido.');
      }
    });
  }
}

function showToast(message) {
  const toast = document.getElementById('toast-notification');
  if (!toast) return;
  
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
