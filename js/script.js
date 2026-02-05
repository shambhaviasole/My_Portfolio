// ===================== INITIALIZATION =====================
document.addEventListener('DOMContentLoaded', function() {
  initializeTheme();
  initializeScrollAnimations();
  initializeBackToTop();
  initializeSmoothScroll();
  initializeTooltips();
  initializeCarousels();
  handleMobileMenu();
  optimizeForMobile();
  
  console.log('Portfolio loaded successfully! 🚀');
});

// ===================== THEME TOGGLE =====================
function initializeTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  // Check for saved theme preference or default to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  if (currentTheme === 'light') {
    body.classList.add('light-theme');
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
  
  themeToggle.addEventListener('click', function() {
    body.classList.toggle('light-theme');
    
    // Update icon and save preference
    if (body.classList.contains('light-theme')) {
      themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
      localStorage.setItem('theme', 'light');
    } else {
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
      localStorage.setItem('theme', 'dark');
    }
    
    // Add a little animation to the toggle
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
  });
}

// ===================== SCROLL ANIMATIONS =====================
function initializeScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  fadeElements.forEach(element => {
    observer.observe(element);
  });
}

// ===================== BACK TO TOP BUTTON =====================
function initializeBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = 'flex';
      backToTopBtn.style.opacity = '1';
    } else {
      backToTopBtn.style.opacity = '0';
      setTimeout(() => {
        if (window.pageYOffset <= 300) {
          backToTopBtn.style.display = 'none';
        }
      }, 300);
    }
  });
  
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===================== SMOOTH SCROLL FOR NAVIGATION =====================
function initializeSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Add active state
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
  
  // Highlight active section on scroll
  window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('.section, .hero');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ===================== BOOTSTRAP TOOLTIPS =====================
function initializeTooltips() {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  
  tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

// ===================== CAROUSEL AUTO-START =====================
function initializeCarousels() {
  // Skills carousel
  const skillsCarousel = document.getElementById('skillsCarousel');
  if (skillsCarousel) {
    const carousel = new bootstrap.Carousel(skillsCarousel, {
      interval: 3000,
      wrap: true
    });
  }
  
  // Other certificates carousel
  const otherCertsCarousel = document.getElementById('otherCertsCarousel');
  if (otherCertsCarousel) {
    const carousel = new bootstrap.Carousel(otherCertsCarousel, {
      interval: 4000,
      wrap: true
    });
  }
}

// ===================== TYPING EFFECT (Optional Enhancement) =====================
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// ===================== PARALLAX EFFECT FOR HERO =====================
let heroTicking = false;

window.addEventListener('scroll', function() {
  if (!heroTicking) {
    window.requestAnimationFrame(function() {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      
      if (hero && scrolled < hero.offsetHeight && window.innerWidth > 768) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / hero.offsetHeight);
      }
      
      heroTicking = false;
    });
    
    heroTicking = true;
  }
});

// ===================== SKILL PROGRESS ANIMATION =====================
function animateProgress() {
  const progressBars = document.querySelectorAll('.progress-bar');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = '0%';
        
        setTimeout(() => {
          entry.target.style.width = width;
        }, 100);
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });
  
  progressBars.forEach(bar => {
    observer.observe(bar);
  });
}

// Initialize progress animation
animateProgress();

// ===================== PROJECT CARD HOVER EFFECTS =====================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.borderColor = 'var(--primary-color)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.borderColor = 'var(--border-color)';
  });
});

// ===================== DYNAMIC YEAR IN FOOTER =====================
const footer = document.querySelector('footer p');
if (footer) {
  const currentYear = new Date().getFullYear();
  footer.textContent = `© ${currentYear} Shambhavi Asole`;
}

// ===================== NAVBAR HIDE ON SCROLL DOWN =====================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');
let ticking = false;

window.addEventListener('scroll', function() {
  if (!ticking) {
    window.requestAnimationFrame(function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
        navbar.style.transition = 'transform 0.3s ease';
      } else if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.transition = 'transform 0.3s ease';
      } else if (currentScroll < lastScroll) {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.transition = 'transform 0.3s ease';
      }
      
      lastScroll = currentScroll;
      ticking = false;
    });
    
    ticking = true;
  }
});

// ===================== LAZY LOADING IMAGES =====================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });
  
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => imageObserver.observe(img));
}

// ===================== CONSOLE EASTER EGG =====================
console.log('%cHey there! 👋', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cLooking for the code? Check out my GitHub!', 'color: #8b5cf6; font-size: 14px;');
console.log('%chttps://github.com/shambhaviasole', 'color: #ec4899; font-size: 12px;');

// ===================== MOBILE MENU HANDLING =====================
function handleMobileMenu() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Close menu on link click for mobile
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        // Smooth scroll and close behavior
        setTimeout(() => {
          window.scrollBy(0, 1); // Trigger scroll event
        }, 100);
      }
    });
  });
}

// ===================== MOBILE OPTIMIZATION =====================
function optimizeForMobile() {
  // Disable parallax on mobile for better performance
  if (window.innerWidth <= 768) {
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.transform = 'none';
      hero.style.opacity = '1';
    }
  }
  
  // Reduce animation on mobile for better performance
  if (window.innerWidth <= 480) {
    const bgShapes = document.querySelector('.bg-shapes');
    if (bgShapes) {
      bgShapes.style.display = 'none';
    }
  }
}

// Re-optimize on window resize
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    optimizeForMobile();
  }, 250);
});

// ===================== TOUCH IMPROVEMENTS =====================
// Improve touch interaction for mobile
if ('ontouchstart' in window) {
  document.querySelectorAll('.skill-badge, .project-card, .card').forEach(element => {
    element.addEventListener('touchstart', function() {
      this.style.transition = 'transform 0.1s ease';
    });
  });
}