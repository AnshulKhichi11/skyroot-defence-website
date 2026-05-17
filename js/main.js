let lastScrollTop = 0;

/* ==================================================
   PROFESSIONAL NAVBAR - AEROSPACE INTERACTIONS
================================================== */

class ProfessionalNavbar {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.progressBar = document.querySelector('.nav-progress');
        
        this.lastScrollTop = 0;
        this.scrollThreshold = 50;
        
        this.init();
    }
    
    init() {
        this.setupScrollBehavior();
        this.setupMobileMenu();
        this.setupActiveLink();
        this.setupProgressBar();
        this.setupSmoothScroll();
    }
    
    setupScrollBehavior() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    handleScroll() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class
        if (currentScroll > this.scrollThreshold) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar
        if (currentScroll > this.lastScrollTop && currentScroll > 100) {
            // Scrolling down
            this.navbar.classList.add('hidden');
        } else {
            // Scrolling up
            this.navbar.classList.remove('hidden');
        }
        
        this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        
        // Update progress bar
        this.updateProgressBar();
    }
    
    setupMobileMenu() {
        if (!this.menuToggle) return;
        
        this.menuToggle.addEventListener('click', () => {
            this.navbar.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Animate menu items
            if (this.navbar.classList.contains('active')) {
                this.animateMenuItems();
            }
        });
        
        // Close menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navbar.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navbar.classList.contains('active')) {
                this.navbar.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    animateMenuItems() {
        if (typeof gsap === 'undefined') return;
        
        const items = document.querySelectorAll('.nav-item');
        
        gsap.from(items, {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out"
        });
    }
    
    setupActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    setupProgressBar() {
        if (!this.progressBar) return;
        
        window.addEventListener('scroll', () => {
            this.updateProgressBar();
        });
    }
    
    updateProgressBar() {
        if (!this.progressBar) return;
        
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        
        this.progressBar.style.width = `${scrolled}%`;
    }
    
    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Check if it's an anchor link
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    
                    if (target) {
                        const offsetTop = target.offsetTop - this.navbar.offsetHeight;
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// Initialize navbar
document.addEventListener('DOMContentLoaded', () => {
    new ProfessionalNavbar();
});

// Optional: Add GSAP hover animations
if (typeof gsap !== 'undefined') {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -2,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        link.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

/* ==================================================
   GSAP ANIMATIONS
================================================== */
gsap.registerPlugin(ScrollTrigger);

/* SECTION FADE-IN */
gsap.utils.toArray(".fade-in").forEach(section => {
    gsap.fromTo(section,
        { opacity: 0, y: 120 },
        {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
                trigger: section,
                start: "top 85%"
            }
        }
    );
});



/* ==================================================
   PROFESSIONAL TEXT REVEAL - AEROSPACE STANDARD
================================================== */

class ProfessionalTextReveal {
    constructor() {
        this.lines = document.querySelectorAll('.title-line');
        this.init();
    }
    
    init() {
        // Add data attributes for shimmer effect
        this.lines.forEach(line => {
            const word = line.querySelector('.title-word');
            word.setAttribute('data-text', word.textContent);
        });
        
        // Delay reveal for dramatic effect
        setTimeout(() => {
            this.revealSequence();
        }, 800);
        
        // Setup scroll interactions
        this.setupScrollEffects();
        
        // Setup mouse parallax (subtle)
        this.setupParallax();
    }
    
    revealSequence() {
        this.lines.forEach((line, index) => {
            setTimeout(() => {
                const word = line.querySelector('.title-word');
                const underline = line.querySelector('.title-underline');
                
                // Reveal word
                word.classList.add('revealed');
                
                // Reveal underline after word
                setTimeout(() => {
                    underline.classList.add('revealed');
                }, 400);
                
                // Add subtle sound effect (optional)
                // this.playRevealSound();
                
            }, index * 400); // Stagger by 400ms
        });
    }
    
    setupScrollEffects() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        
        const words = document.querySelectorAll('.title-word');
        
        // Fade out on scroll
        gsap.to(words, {
            opacity: 0,
            y: -100,
            rotationX: -30,
            stagger: 0.1,
            ease: "power2.in",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });
        
        // Fade out grid
        gsap.to('.grid-overlay', {
            opacity: 0,
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "center top",
                scrub: 1
            }
        });
    }
    
    setupParallax() {
        if (window.innerWidth < 768) return; // Skip on mobile
        
        const container = document.querySelector('.hero-title-container');
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 10;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 10;
        });
        
        // Smooth animation loop
        const animate = () => {
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;
            
            container.style.transform = `
                translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px))
                rotate(-5deg)
            `;
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ProfessionalTextReveal();
});

/* ==================================================
   ENHANCED SPACE CANVAS (OPTIONAL)
================================================== */

const canvas = document.getElementById("space-canvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);
    
    // Particle system
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedY = Math.random() * 0.5 + 0.1;
            this.opacity = Math.random() * 0.5 + 0.3;
        }
        
        update() {
            this.y -= this.speedY;
            if (this.y < 0) this.reset();
        }
        
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }
    
    const particles = Array.from({ length: 100 }, () => new Particle());
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}


/* ==================================================
   ABOUT SECTION ENHANCEMENTS
================================================== */

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = entry.target;
                const text = target.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[\d.]/g, '');
                const duration = 2000;
                const steps = 60;
                const increment = number / steps;
                let current = 0;
                
                target.classList.add('counted');
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        target.textContent = number.toLocaleString() + suffix;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current).toLocaleString() + suffix;
                    }
                }, duration / steps);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
};

// Visual card tilt effect
const setupVisualTilt = () => {
    const card = document.querySelector('.visual-card');
    if (!card || window.innerWidth <= 768) return;
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
};

// Parallax text effect
const setupTextParallax = () => {
    const aboutSection = document.querySelector('.about-section');
    if (!aboutSection || window.innerWidth <= 768) return;
    
    window.addEventListener('scroll', () => {
        const rect = aboutSection.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.05;
        
        const content = aboutSection.querySelector('.about-content');
        if (content) {
            content.style.transform = `translateY(${rate}px)`;
        }
    });
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    animateCounters();
    setupVisualTilt();
    setupTextParallax();
});

/* ==================================================
   HERO TIMELINE
================================================== */
/* ==================================================
   CENTRALIZED FLOATING PRODUCT MANAGER
   No overlap - Clean transitions between images
================================================== */

(function() {
  'use strict';

  const products = {
    hero: {
      element: document.querySelector('.floating-product'),
      section: document.querySelector('.hero'),
    },
    about: {
      element: document.querySelector('.floating-product'),
      section: document.querySelector('.about-section'),
    },
    features: {
      element: document.querySelector('.floating-product1'),
      section: document.querySelector('.features-section'),
    },
    modes: {
      element: document.querySelector('.floating-product2'),
      section: document.querySelector('.modes-section'),
    }
  };

  // Initialize on DOM load
  document.addEventListener('DOMContentLoaded', initProductManager);

  function initProductManager() {
    // Set initial states
    if (products.hero.element) {
      gsap.set(products.hero.element, { opacity: 1, visibility: 'visible' });
    }
    if (products.features.element) {
      gsap.set(products.features.element, { opacity: 0, visibility: 'hidden' });
    }
    if (products.modes.element) {
      gsap.set(products.modes.element, { opacity: 0, visibility: 'hidden' });
    }

    // Setup scroll triggers
    setupHeroSection();
    setupAboutSection();
    setupFeaturesSection();
    setupModesSection();
  }

  /* ==========================================
     HERO SECTION
  ========================================== */
  function setupHeroSection() {
    if (!products.hero.element || !products.hero.section) return;

    const heroTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "+=100%",
        scrub: true,
        pin: true
      }
    });

    heroTL
      .fromTo("#bg-video", { scale: 1.25 }, { scale: 1, ease: "none" }, 0)
      .from(".hero-content h2", { y: 120, opacity: 0 }, 0.1)
      .from(".hero-content p", { y: 100, opacity: 0 }, 0.2)
      .from(".btn-primary", { y: 80, opacity: 0 }, 0.3)
      .to(".hero-content", { opacity: 0 }, 0.65);
  }

  /* ==========================================
     ABOUT SECTION (floating-product continues)
  ========================================== */
  function setupAboutSection() {
    if (!products.about.element) return;

    // Movement animation to about section
    gsap.to(products.about.element, {
      scrollTrigger: {
        trigger: ".about-section",
        start: "top bottom",
        end: "top center",
        scrub: 1
      },
      top: "60%",
      left: "85%",
      rotation: 0,
      scale: 0.8,
      ease: "power2.out"
    });

    // About section visibility - STRICT BOUNDARIES
    ScrollTrigger.create({
      trigger: ".about-section",
      start: "top 90%", // Start showing earlier
      end: "bottom 30%", // Hide before features section
      onEnter: () => {
        gsap.to(products.about.element, {
          opacity: 1,
          visibility: "visible",
          duration: 0.4
        });
      },
      onLeave: () => {
        // COMPLETELY HIDE floating-product FIRST
        gsap.to(products.about.element, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            gsap.set(products.about.element, { 
              visibility: 'hidden',
              display: 'none' // Extra safety
            });
            
            // THEN show floating-product1 after delay
            setTimeout(() => {
              if (products.features.element) {
                gsap.set(products.features.element, { 
                  visibility: 'visible',
                  display: 'block'
                });
                gsap.to(products.features.element, { 
                  opacity: 1, 
                  duration: 0.5 
                });
              }
            }, 100); // Small delay to ensure no overlap
          }
        });
      },
      onEnterBack: () => {
        // COMPLETELY HIDE floating-product1 FIRST
        if (products.features.element) {
          gsap.to(products.features.element, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              gsap.set(products.features.element, { 
                visibility: 'hidden',
                display: 'none'
              });
              
              // THEN show floating-product
              setTimeout(() => {
                gsap.set(products.about.element, { 
                  visibility: 'visible',
                  display: 'block'
                });
                gsap.to(products.about.element, { 
                  opacity: 1, 
                  duration: 0.4 
                });
              }, 100);
            }
          });
        }
      },
      onLeaveBack: () => {
        // Keep visible for hero section
        gsap.to(products.about.element, {
          opacity: 1,
          visibility: "visible",
          display: 'block',
          duration: 0.3
        });
      }
    });

    // Floating effect
    gsap.to(products.about.element, {
      y: "+=15",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  /* ==========================================
     FEATURES SECTION (floating-product1)
  ========================================== */
  function setupFeaturesSection() {
    if (!products.features.element) return;

    // Entrance animation
    gsap.timeline({
      scrollTrigger: {
        trigger: ".features-section",
        start: "top bottom",
        end: "top 30%",
        scrub: 1.5
      }
    })
    .fromTo(products.features.element, 
      { scale: 0.3, rotation: 45 },
      { scale: 0.75, rotation: -5, ease: "power3.out" }
    )
    .to(products.features.element, {
      top: "50%",
      left: "82%",
      rotation: 0,
      scale: 0.8,
      ease: "power2.inOut"
    });

    // Features section visibility - STRICT BOUNDARIES
    ScrollTrigger.create({
      trigger: ".features-section",
      start: "top 60%", // Start when features section enters
      end: "bottom 40%", // End before modes section
      onEnter: () => {
        // Already handled by about section's onLeave
        // But ensure it's visible
        gsap.set(products.features.element, { 
          visibility: 'visible',
          display: 'block'
        });
        gsap.to(products.features.element, {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out"
        });
        products.features.element?.classList.add("active");
      },
      onLeave: () => {
        // COMPLETELY HIDE floating-product1 FIRST
        gsap.to(products.features.element, {
          opacity: 0,
          duration: 0.1,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(products.features.element, { 
              visibility: "hidden",
              display: 'none'
            });
            products.features.element?.classList.remove("active");
            
            // THEN show floating-product2 after delay
            setTimeout(() => {
              if (products.modes.element) {
                gsap.set(products.modes.element, { 
                  visibility: 'visible',
                  display: 'block'
                });
                gsap.to(products.modes.element, { 
                  opacity: 1, 
                  duration: 0.5 
                });
              }
            }, 100);
          }
        });
      },
      onEnterBack: () => {
        // COMPLETELY HIDE floating-product2 FIRST
        if (products.modes.element) {
          gsap.to(products.modes.element, {
            opacity: 0,
            duration: 0.1,
            onComplete: () => {
              gsap.set(products.modes.element, { 
                visibility: 'hidden',
                display: 'none'
              });
              
              // THEN show floating-product1
              setTimeout(() => {
                gsap.set(products.features.element, { 
                  visibility: 'visible',
                  display: 'block'
                });
                gsap.to(products.features.element, {
                  opacity: 1,
                  duration: 0.4,
                  ease: "power2.out"
                });
                products.features.element?.classList.add("active");
              }, 100);
            }
          });
        }
      },
      onLeaveBack: () => {
        // Will be handled by about section
      }
    });

    // Floating effect
    gsap.to(products.features.element, {
      y: "+=15",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      paused: false
    });

    // Parallax on scroll
    ScrollTrigger.create({
      trigger: ".features-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 2,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(products.features.element, {
          rotationY: progress * 10,
          rotationX: progress * -5,
          duration: 0.3,
          ease: "none"
        });
      }
    });
  }

  /* ==========================================
     MODES SECTION (floating-product2)
  ========================================== */
  function setupModesSection() {
    const modesSection = products.modes.section;
    const floatingProduct = products.modes.element;

    if (!modesSection || !floatingProduct) return;

    let hasAnimated = false;
    let isFloating = false;

    // Modes section visibility - triggered by features section
    ScrollTrigger.create({
      trigger: ".modes-section",
      start: "top 95%",
      end: "bottom 20%",
      onEnter: () => {
        gsap.set(floatingProduct, { 
          visibility: "visible",
          display: "block"
        });
        gsap.to(floatingProduct, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });

        if (!hasAnimated) {
          hasAnimated = true;
          triggerModesAnimation();
        } else {
          isFloating = true;
          floatingProduct.classList.add('is-floating');
        }
      },
      onLeave: () => {
        isFloating = false;
        floatingProduct.classList.remove('is-floating');
        gsap.to(floatingProduct, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(floatingProduct, { 
              visibility: "hidden",
              display: "none"
            });
          }
        });
      },
      onEnterBack: () => {
        gsap.set(floatingProduct, { 
          visibility: "visible",
          display: "block"
        });
        gsap.to(floatingProduct, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        isFloating = true;
        floatingProduct.classList.add('is-floating');
      },
      onLeaveBack: () => {
        // Will be handled by features section
      }
    });

    function triggerModesAnimation() {
      // Animate text content
      const textElements = [
        { selector: '.about-eyebrow', delay: 600 },
        { selector: '.modes-heading', delay: 700 },
        { selector: '.lead-text', delay: 800 },
        { selector: '.description-text', delay: 900 },
        { selector: '.highlight-text', delay: 1000 },
        { selector: '.available-modes-title', delay: 1100 }
      ];

      textElements.forEach(({ selector, delay }) => {
        const element = document.querySelector(selector);
        if (element) {
          setTimeout(() => element.classList.add('visible'), delay);
        }
      });

      // Animate mode cards
      setTimeout(() => {
        document.querySelectorAll('.mode-card').forEach(card => {
          card.classList.add('visible');
        });
      }, 1200);

      // Animate floating product
      animateFloatingProduct();
    }

    function animateFloatingProduct() {
      setTimeout(() => {
        floatingProduct.classList.add('animate-entry');
        
        setTimeout(() => {
          floatingProduct.classList.add('is-floating');
          isFloating = true;
          initParallax();
          if (window.innerWidth > 1024) {
            initMouseParallax();
          }
        }, 2500);
      }, 300);
    }

    function initParallax() {
      if (window.innerWidth <= 1024) return;

      let ticking = false;

      function updateParallax() {
        if (!isFloating) return;

        const scrollY = window.pageYOffset;
        const sectionTop = modesSection.offsetTop;
        const sectionHeight = modesSection.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;
        const windowHeight = window.innerHeight;

        if (scrollY + windowHeight > sectionTop - 200 && scrollY < sectionBottom + 200) {
          const relativeScroll = scrollY - sectionTop;
          const scrollProgress = relativeScroll / sectionHeight;

          const translateY = relativeScroll * 0.15;
          const translateX = Math.sin(scrollProgress * Math.PI * 2) * 15;
          const rotation = Math.sin(scrollProgress * Math.PI * 3) * 3;

          floatingProduct.style.transform = `
            translateX(${translateX}px)
            translateY(calc(-50% + ${translateY}px))
            rotate(${rotation}deg)
          `;

          let opacity = 1;
          if (scrollProgress < 0.1) {
            opacity = scrollProgress * 10;
          } else if (scrollProgress > 0.9) {
            opacity = (1 - scrollProgress) * 10;
          }
          floatingProduct.style.opacity = Math.max(0, Math.min(1, opacity));
        } else if (scrollY > sectionBottom + 300) {
          floatingProduct.style.opacity = '0';
        }

        ticking = false;
      }

      function requestParallaxUpdate() {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      }

      window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
      updateParallax();
    }

    function initMouseParallax() {
      let mouseX = 0;
      let mouseY = 0;
      let currentX = 0;
      let currentY = 0;

      document.addEventListener('mousemove', (e) => {
        if (!isFloating) return;

        const rect = modesSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          mouseX = (e.clientX / window.innerWidth - 0.5) * 25;
          mouseY = (e.clientY / window.innerHeight - 0.5) * 25;
        }
      });

      function animateMouseParallax() {
        if (!isFloating) {
          requestAnimationFrame(animateMouseParallax);
          return;
        }

        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;

        const rotateY = currentX * 0.4;
        const rotateX = -currentY * 0.4;

        floatingProduct.style.transform = `
          translateY(-50%)
          translateX(${currentX * 0.3}px)
          rotateY(${rotateY}deg)
          rotateX(${rotateX}deg)
        `;

        requestAnimationFrame(animateMouseParallax);
      }

      setTimeout(() => {
        if (isFloating) {
          animateMouseParallax();
        }
      }, 3000);
    }

    // Mode cards interactions
    document.querySelectorAll('.mode-card').forEach(card => {
      card.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });

      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
      });

      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Responsive handling
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (floatingProduct) {
          floatingProduct.style.display = window.innerWidth <= 1024 ? 'none' : 'block';
        }
      }, 250);
    });

    // Page visibility handler
    document.addEventListener('visibilitychange', () => {
      if (floatingProduct) {
        if (document.hidden) {
          floatingProduct.style.animationPlayState = 'paused';
        } else {
          floatingProduct.style.animationPlayState = 'running';
        }
      }
    });
  }

  ScrollTrigger.create({
    trigger: "footer",
    start: "top 85%", // hide as soon as footer starts entering
    onEnter: () => {
      gsap.to(".product-modes", {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          gsap.set(".product-modes", {
            visibility: "hidden",
            display: "none"
          });
        }
      });
    },
    onLeaveBack: () => {
      gsap.set(".product-modes", {
        visibility: "visible",
        display: "block"
      });
      gsap.to(".product-modes", {
        opacity: 1,
        duration: 0.2
      });
    }
  });

  // Safety net: hide modes product when footer is visible (works even if ScrollTrigger misses)
  const footerEl = document.querySelector('.site-footer') || document.querySelector('footer');
  if (footerEl && products.modes.element && products.modes.section) {
    const showModesProduct = () => {
      gsap.set(products.modes.element, {
        visibility: "visible",
        display: "block"
      });
      gsap.to(products.modes.element, {
        opacity: 1,
        duration: 0.2
      });
    };

    const hideModesProduct = () => {
      products.modes.element.classList.remove('is-floating');
      gsap.to(products.modes.element, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          gsap.set(products.modes.element, {
            visibility: "hidden",
            display: "none"
          });
        }
      });
    };

    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          hideModesProduct();
        } else {
          const rect = products.modes.section.getBoundingClientRect();
          const inView = rect.top < window.innerHeight && rect.bottom > 0;
          if (inView) {
            showModesProduct();
          }
        }
      });
    }, { threshold: 0.01 });

    footerObserver.observe(footerEl);
  }

})();
