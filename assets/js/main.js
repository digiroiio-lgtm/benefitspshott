// P-Shot Benefits - Main JavaScript

document.addEventListener('DOMContentLoaded', function () {

  // Mobile Navigation
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link.has-dropdown');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    navLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const parent = link.parentElement;
          parent.classList.toggle('dropdown-open');
        }
      });
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        const isActive = item.classList.contains('active');
        faqItems.forEach(function (i) { i.classList.remove('active'); });
        if (!isActive) { item.classList.add('active'); }
      });
    }
  });

  // Sticky Bottom CTA
  const stickyCta = document.querySelector('.sticky-cta');
  const stickyClose = document.querySelector('.sticky-cta-close');
  let stickyClosed = false;

  function handleStickyCta() {
    if (!stickyCta || stickyClosed) return;
    const scrolled = window.scrollY > 300;
    const ctaSection = document.querySelector('.cta-banner');
    if (ctaSection) {
      const rect = ctaSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        stickyCta.classList.remove('visible');
        return;
      }
    }
    stickyCta.classList.toggle('visible', scrolled);
  }

  if (stickyClose) {
    stickyClose.addEventListener('click', function () {
      stickyClosed = true;
      stickyCta.classList.remove('visible');
    });
  }

  window.addEventListener('scroll', handleStickyCta, { passive: true });
  handleStickyCta();

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
        if (navMenu) {
          navMenu.classList.remove('open');
          hamburger && hamburger.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  });

  // WhatsApp
  document.querySelectorAll('.whatsapp-btn, [data-whatsapp]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      const phone = '905001234567';
      const msg = encodeURIComponent('Hello, I am interested in ED treatment options. Could you please provide more information?');
      window.open('https://wa.me/' + phone + '?text=' + msg, '_blank');
    });
  });

  // Form Validation
  const forms = document.querySelectorAll('.contact-form form, form[data-contact]');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const successEl = form.closest('.contact-form') && form.closest('.contact-form').querySelector('.form-success');

      let valid = true;
      form.querySelectorAll('[required]').forEach(function (field) {
        if (!field.value.trim()) {
          field.style.borderColor = '#e74c3c';
          valid = false;
          field.addEventListener('input', function () { field.style.borderColor = ''; }, { once: true });
        }
      });

      const emailField = form.querySelector('[type="email"]');
      if (emailField && emailField.value && !emailField.value.includes('@')) {
        emailField.style.borderColor = '#e74c3c';
        valid = false;
      }

      if (!valid) return;

      if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }

      setTimeout(function () {
        if (successEl) {
          form.style.display = 'none';
          successEl.style.display = 'block';
        } else {
          form.innerHTML = '<div class="form-success" style="display:block;text-align:center;padding:2rem;background:#eafaf1;border-radius:8px;color:#27ae60"><h3>Thank You!</h3><p>Your enquiry has been received. Our medical team will contact you within 24 hours.</p></div>';
        }
      }, 1200);
    });
  });

  // TOC Active Highlighting
  const tocLinks = document.querySelectorAll('.toc-box a');
  if (tocLinks.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          tocLinks.forEach(function (l) { l.style.fontWeight = ''; l.style.color = ''; });
          const id = entry.target.getAttribute('id');
          const active = document.querySelector('.toc-box a[href="#' + id + '"]');
          if (active) { active.style.fontWeight = '700'; active.style.color = 'var(--primary)'; }
        }
      });
    }, { rootMargin: '-80px 0px -60% 0px' });

    document.querySelectorAll('.article-content h2[id], .article-content h3[id]').forEach(function (h) {
      observer.observe(h);
    });
  }

});
