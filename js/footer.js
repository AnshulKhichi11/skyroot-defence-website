(function() {
    'use strict';

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    /**
     * Initialize all functionality
     */
    function initialize() {
        console.log('Initializing newsletter and footer...');

        try {
            initializeNewsletter();
            initializeFooter();
            console.log('Initialization complete!');
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    /**
     * Initialize newsletter functionality
     */
    function initializeNewsletter() {
        const newsletterForm = document.querySelector('.newsletter-form');
        if (!newsletterForm) return;

        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const checkbox = newsletterForm.querySelector('input[type="checkbox"]');
            const submitBtn = newsletterForm.querySelector('.newsletter-submit');
            
            if (!validateEmail(emailInput.value.trim())) {
                showNewsletterMessage('Please enter a valid email address', 'error', newsletterForm);
                return;
            }

            if (!checkbox.checked) {
                showNewsletterMessage('Please accept the privacy policy', 'error', newsletterForm);
                return;
            }

            // Simulate submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'SUBMITTING...';

            setTimeout(function() {
                showNewsletterMessage('Thank you for subscribing!', 'success', newsletterForm);
                emailInput.value = '';
                checkbox.checked = false;
                submitBtn.disabled = false;
                submitBtn.textContent = 'SUBMIT';
                
                // Track event
                trackEvent('Newsletter', 'Subscribe', emailInput.value);
            }, 1500);
        });

        // Add parallax effect to newsletter background
        setupNewsletterParallax();
    }

    /**
     * Setup newsletter parallax scrolling
     */
    function setupNewsletterParallax() {
        const hero = document.querySelector('.newsletter-hero');
        if (!hero) return;

        let ticking = false;

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * 0.5;
                    hero.style.backgroundPositionY = rate + 'px';
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    /**
     * Show newsletter message
     */
    function showNewsletterMessage(message, type, container) {
        const existingMessage = container.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageEl = document.createElement('div');
        messageEl.className = 'form-message form-message--' + type;
        messageEl.textContent = message;
        messageEl.style.cssText = 
            'margin-top: 16px; padding: 12px 16px; border-radius: 8px; ' +
            'font-size: 14px; font-weight: 500; text-align: center; ' +
            'background: ' + (type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)') + '; ' +
            'color: #fff; ' +
            'border: 1px solid ' + (type === 'success' ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)') + ';';

        container.appendChild(messageEl);

        setTimeout(function() {
            messageEl.style.transition = 'opacity 0.3s ease';
            messageEl.style.opacity = '0';
            setTimeout(function() {
                if (messageEl.parentNode) {
                    messageEl.remove();
                }
            }, 300);
        }, 4000);
    }

    /**
     * Initialize all footer functionality
     */
    function initializeFooter() {
        const footer = document.querySelector('.site-footer');
        
        if (!footer) {
            console.error('Footer element not found!');
            return;
        }

        console.log('Initializing footer...');

        try {
            // Add decorative elements
            addDecorativeElements(footer);
            
            // Initialize animations
            setupIntersectionObserver();
            
            // Setup interactions
            setupSmoothScrolling();
            updateCopyright();
            highlightActivePage();
            setupAdvancedHoverEffects();
            setupParallaxEffect();
            setupNewsletterForm();
            setupSocialTracking();
            
            // Mark footer as loaded
            setTimeout(function() {
                footer.classList.add('loaded');
            }, 100);

            console.log('Footer initialized successfully!');
        } catch (error) {
            console.error('Footer initialization error:', error);
        }
    }

    /**
     * Add decorative geometric elements
     */
    function addDecorativeElements(footer) {
        const container = footer.querySelector('.footer-container');
        if (!container) return;

        for (let i = 0; i < 2; i++) {
            const decoration = document.createElement('div');
            decoration.className = 'footer-decoration';
            container.appendChild(decoration);
            
            setTimeout(function() {
                decoration.classList.add('visible');
            }, 500 + (i * 200));
        }
    }

    /**
     * Setup Intersection Observer for animations
     */
    function setupIntersectionObserver() {
        // Check browser support
        if (!('IntersectionObserver' in window)) {
            // Fallback: show everything
            document.querySelectorAll('.footer-column, .footer-orbit').forEach(function(el) {
                el.classList.add('animate-in');
            });
            const bottom = document.querySelector('.footer-bottom');
            if (bottom) bottom.classList.add('visible');
            return;
        }

        const options = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateElement(entry.target);
                }
            });
        }, options);

        // Observe columns
        const columns = document.querySelectorAll('.footer-column');
        columns.forEach(function(column, index) {
            column.style.transitionDelay = (index * 100) + 'ms';
            observer.observe(column);
        });

        // Observe newsletter
        const orbit = document.querySelector('.footer-orbit');
        if (orbit) {
            orbit.style.transitionDelay = (columns.length * 100) + 'ms';
            observer.observe(orbit);
        }

        // Observe bottom section
        const footerBottom = document.querySelector('.footer-bottom');
        if (footerBottom) {
            observer.observe(footerBottom);
        }
    }

    /**
     * Animate element when visible
     */
    function animateElement(element) {
        if (element.classList.contains('footer-column') || 
            element.classList.contains('footer-orbit')) {
            element.classList.add('animate-in');
        } else if (element.classList.contains('footer-bottom')) {
            element.classList.add('visible');
        }
    }

    /**
     * Setup smooth scrolling for anchor links
     */
    function setupSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('.footer-links a[href^="#"]');
        
        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            });
        });
    }

    /**
     * Update copyright year dynamically
     */
    function updateCopyright() {
        const copyrightText = document.querySelector('.footer-copyright p');
        if (copyrightText) {
            const currentYear = new Date().getFullYear();
            copyrightText.textContent = '© ' + currentYear + ' Kshitej Defence Systems. All rights reserved.';
        }
    }

    /**
     * Highlight active page in navigation
     */
    function highlightActivePage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const footerLinks = document.querySelectorAll('.footer-links a');
        
        footerLinks.forEach(function(link) {
            const href = link.getAttribute('href');
            const linkPage = href.split('/').pop();
            
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Advanced hover effects with magnetic pull
     */
    function setupAdvancedHoverEffects() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(function(link) {
            link.addEventListener('mousemove', function(e) {
                const rect = link.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                link.style.transform = 'translate(' + (x * 0.3) + 'px, ' + (y * 0.3) + 'px) scale(1.05)';
            });
            
            link.addEventListener('mouseleave', function() {
                link.style.transform = '';
            });
        });

        // Contact item hover effect
        const contactItems = document.querySelectorAll('.footer-contact li');
        contactItems.forEach(function(item) {
            item.addEventListener('mouseenter', function() {
                const icon = item.querySelector('.contact-icon');
                if (icon) {
                    icon.style.transform = 'rotate(360deg) scale(1.1)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const icon = item.querySelector('.contact-icon');
                if (icon) {
                    icon.style.transform = '';
                }
            });
        });
    }

    /**
     * Parallax effect on scroll
     */
    function setupParallaxEffect() {
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    applyParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    /**
     * Apply parallax transformation
     */
    function applyParallax() {
        const footer = document.querySelector('.site-footer');
        if (!footer) return;

        const rect = footer.getBoundingClientRect();
        const scrollPercentage = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
        
        const decorations = footer.querySelectorAll('.footer-decoration');
        decorations.forEach(function(decoration, index) {
            const speed = (index + 1) * 0.5;
            const yOffset = scrollPercentage * 50 * speed;
            decoration.style.transform = 'translateY(' + yOffset + 'px)';
        });
    }

    /**
     * Newsletter form handling (for footer orbit form)
     */
    function setupNewsletterForm() {
        const form = document.querySelector('.orbit-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const input = form.querySelector('input[type="email"]');
            const button = form.querySelector('button');
            const email = input.value.trim();
            
            if (!validateEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            button.disabled = true;
            button.textContent = 'Submitting...';
            
            setTimeout(function() {
                handleFormSuccess(input, button);
                trackEvent('Newsletter', 'Subscribe', email);
            }, 1000);
        });
    }

    /**
     * Validate email format
     */
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * Handle successful form submission
     */
    function handleFormSuccess(input, button) {
        showFormMessage('Thank you for subscribing!', 'success');
        input.value = '';
        button.textContent = 'Submit';
        button.disabled = false;
        
        button.style.background = '#000';
        setTimeout(function() {
            button.style.background = '';
        }, 2000);
    }

    /**
     * Show form message
     */
    function showFormMessage(message, type) {
        const form = document.querySelector('.orbit-form');
        if (!form) return;

        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageEl = document.createElement('div');
        messageEl.className = 'form-message form-message--' + type;
        messageEl.textContent = message;
        messageEl.style.cssText = 
            'margin-top: 12px; padding: 10px 14px; border-radius: 8px; font-size: 13px; ' +
            'background: ' + (type === 'success' ? '#f0f0f0' : '#fafafa') + '; ' +
            'color: ' + (type === 'success' ? '#000' : '#666') + '; ' +
            'border: 1px solid ' + (type === 'success' ? '#e5e5e5' : '#ddd') + ';';

        form.appendChild(messageEl);

        setTimeout(function() {
            messageEl.style.opacity = '0';
            messageEl.style.transition = 'opacity 0.3s';
            setTimeout(function() {
                if (messageEl.parentNode) {
                    messageEl.remove();
                }
            }, 300);
        }, 4000);
    }

    /**
     * Setup social media tracking
     */
    function setupSocialTracking() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const platform = link.getAttribute('aria-label');
                trackEvent('Social', 'Click', platform);
            });
        });
    }

    /**
     * Track events
     */
    function trackEvent(category, action, label) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
        console.log('Event tracked: ' + category + ' - ' + action + ' - ' + label);
    }

})();