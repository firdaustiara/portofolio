document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
     1. THEME TOGGLE (DARK / LIGHT MODE)
  ========================================= */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn.querySelector('i');
  
  // Deteksi preferensi tersimpan di LocalStorage atau preferensi sistem
  const savedTheme = localStorage.getItem('portfolio-theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    } else {
      document.body.removeAttribute('data-theme');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
  }

  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  });

  /* =========================================
     2. MOBILE NAVBAR TOGGLE
  ========================================= */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  // Tutup menu mobile ketika link ditekan
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });

  /* =========================================
     3. SCROLL PROGRESS & ACTIVE NAVBAR ON SCROLL
  ========================================= */
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Scroll Progress Width
    if (docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = scrollPercent + '%';
    }

    // Back to Top Visibility
    if (scrollTop > 400) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }

    // Active Navigation Highlight
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  /* =========================================
     4. TYPING TEXT ANIMATION (HERO)
  ========================================= */
  const words = [
    "Information Systems Graduate",
    "Admin & Data Specialist",
    "Digital Marketing Enthusiast",
    "Web Development Learner"
  ];
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.querySelector('.typing-text');
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const delayBetweenWords = 1800;

  function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = delayBetweenWords;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 400;
    }

    setTimeout(typeEffect, speed);
  }

  if (typingElement) {
    typeEffect();
  }

  /* =========================================
     5. SCROLL REVEAL ANIMATION
  ========================================= */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Hanya animasi 1 kali
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* =========================================
     6. COUNT-UP ANIMATION FOR STATISTICS
  ========================================= */
  const statsElements = document.querySelectorAll('.stat-num');

  function animateCounters() {
    statsElements.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const decimals = parseInt(counter.getAttribute('data-decimals')) || 0;
      const suffix = counter.getAttribute('data-suffix') || '';
      
      let count = 0;
      const duration = 1800; // ms
      const steps = 60;
      const increment = target / steps;
      const intervalTime = duration / steps;

      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          counter.textContent = target.toFixed(decimals) + suffix;
          clearInterval(timer);
        } else {
          counter.textContent = count.toFixed(decimals) + suffix;
        }
      }, intervalTime);
    });
  }

  const statsSection = document.querySelector('.about-section');
  let animated = false;

  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        animateCounters();
        animated = true;
      }
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }

  /* =========================================
     7. CONTACT FORM VALIDATION & HANDLING
  ========================================= */
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');

      // Validasi Name
      if (!nameInput.value.trim()) {
        nameInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        nameInput.parentElement.classList.remove('has-error');
      }

      // Validasi Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        emailInput.parentElement.classList.remove('has-error');
      }

      // Validasi Subject
      if (!subjectInput.value.trim()) {
        subjectInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        subjectInput.parentElement.classList.remove('has-error');
      }

      // Validasi Message
      if (!messageInput.value.trim()) {
        messageInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        messageInput.parentElement.classList.remove('has-error');
      }

      // Feedback submit
      if (isValid) {
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Terima kasih! Pesan Anda telah terkirim (Mode Simulasi).';
        contactForm.reset();
        
        setTimeout(() => {
          formFeedback.style.display = 'none';
        }, 5000);
      }
    });
  }
});
