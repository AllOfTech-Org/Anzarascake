/**
 * Anzara's Cake – Premium bakery website
 * Scroll reveal, navigation, lightbox, micro-interactions
 */

(function () {
  'use strict';

  const header = document.getElementById('header');
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const revealElements = document.querySelectorAll('.reveal');
  const galleryCards = document.querySelectorAll('.gallery-card .card-link');
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');
  const lightboxImg = lightbox?.querySelector('.lightbox-img');
  const lightboxCaption = lightbox?.querySelector('.lightbox-caption');

  // ----- Scroll: header background -----
  function onScroll() {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----- Scroll reveal (Intersection Observer) -----
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1,
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ----- Hero banner slider (slides behind "Home-made with love / Anzara's Cake / A ready-to-eat slice of heaven.") -----
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    let currentSlide = 0;
    const SLIDE_INTERVAL = 5500;

    function nextHeroSlide() {
      heroSlides[currentSlide].classList.remove('hero-slide--active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('hero-slide--active');
    }

    const heroSliderTimer = setInterval(nextHeroSlide, SLIDE_INTERVAL);
  }

  // ----- Mobile nav toggle -----
  function openNav() {
    nav?.classList.add('is-open');
    navToggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    nav?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  navToggle?.addEventListener('click', () => {
    const isOpen = nav?.classList.contains('is-open');
    if (isOpen) closeNav();
    else openNav();
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeNav();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav?.classList.contains('is-open')) {
      closeNav();
    }
  });

  // ----- Smooth scroll for anchor links (enhance) -----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ----- Lightbox -----
  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg || !lightboxCaption) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightboxCaption.textContent = alt;
    lightbox.hidden = false;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lightboxClose?.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightbox.hidden = true;
      lightboxImg.src = '';
      lightboxImg.alt = '';
      lightboxCaption.textContent = '';
    }, 400);
  }

  galleryCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const img = card.querySelector('.card-img-wrap img');
      const title = card.querySelector('.card-title');
      if (img?.src && title) {
        openLightbox(img.src, title.textContent);
      }
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox?.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  // ----- Optional: subtle parallax on hero (optional enhancement) -----
  const hero = document.getElementById('hero');
  if (hero) {
    window.addEventListener(
      'scroll',
      () => {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.2;
        const pattern = hero.querySelector('.hero-pattern');
        if (pattern && scrolled < window.innerHeight) {
          pattern.style.transform = `translateY(${rate}px)`;
        }
      },
      { passive: true }
    );
  }
})();
