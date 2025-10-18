let lastScrollTop = 0;

// Handles navbar background on scroll
function handleScrollStyle() {
  const nav = document.querySelector(".navbar");
  if (!nav) return;

  // Add/remove "scrolled" background
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

  // Hide on scroll down, show on scroll up
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  if (currentScroll > lastScrollTop && currentScroll > 100) {
    // Scrolling down
    nav.classList.add("hide");
  } else {
    // Scrolling up
    nav.classList.remove("hide");
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}

// Scroll listener
function updateNavbarScroll() {
  window.removeEventListener("scroll", handleScrollStyle);
  window.addEventListener("scroll", handleScrollStyle);
  handleScrollStyle();
}

// Dummy includeHTML (if you’re using external HTML injection)
function includeHTML() {
  // You can leave this empty or add your logic
}

// Run after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  includeHTML();
  updateNavbarScroll();
});


// Function to handle the mobile menu toggle
function setupMobileToggle() {
    const navBar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelectorAll('.navbar nav ul li a');

    if (!menuToggle) return;

    // Toggle logic for the button
    menuToggle.addEventListener('click', () => {
        navBar.classList.toggle('active');
        // Prevent body scrolling when menu is open
        document.body.classList.toggle('menu-open');
    });

    // Close menu when a link is clicked (for single-page navigation or simple links)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navBar.classList.contains('active')) {
                navBar.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
}

// Add setupMobileToggle to your main DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', () => {
    // ... existing includeHTML() call ...
    setupMobileToggle(); // Call the new function
});