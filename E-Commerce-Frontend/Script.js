// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const themeSwitch = document.querySelector('.theme-switch');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeSwitch.classList.remove('active');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeSwitch.classList.add('active');
    }
}

// Home button functionality
function goHome() {
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add to cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add some interactive behavior for add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            this.textContent = 'Added! ✓';
            this.style.background = '#10b981';
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.background = 'var(--primary-color)';
            }, 2000);
        });
    });

    // Header search functionality
    const headerSearchInput = document.querySelector('.header-search-input');
    const headerSearchBtn = document.querySelector('.header-search-btn');

    if (headerSearchInput) {
        headerSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }

    if (headerSearchBtn) {
        headerSearchBtn.addEventListener('click', function() {
            const searchTerm = document.querySelector('.header-search-input').value;
            if (searchTerm) {
                performSearch(searchTerm);
            }
        });
    }

    // Newsletter subscription
    const newsletterInput = document.querySelector('.newsletter-input');
    const newsletterBtn = document.querySelector('.newsletter-btn');

    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function() {
            const email = newsletterInput.value;
            if (email && isValidEmail(email)) {
                alert('Thank you for subscribing! You will receive updates at: ' + email);
                newsletterInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    if (newsletterInput) {
        newsletterInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                newsletterBtn.click();
            }
        });
    }

    // Wishlist and Cart interactions
    const wishlistBtn = document.querySelector('.icon-btn');
    const cartBtns = document.querySelectorAll('.icon-btn');

    if (cartBtns.length >= 2) {
        // Wishlist button (first icon-btn)
        cartBtns[0].addEventListener('click', function() {
            showNotification('Wishlist opened!');
        });

        // Cart button (second icon-btn)
        cartBtns[1].addEventListener('click', function() {
            showNotification('Shopping cart opened!');
        });
    }

    // Category dropdown item clicks
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function() {
            const category = this.textContent.trim();
            showNotification(`Browsing: ${category}`);
        });
    });

    // Profile dropdown item clicks
    document.querySelectorAll('.profile-dropdown-item').forEach(item => {
        item.addEventListener('click', function() {
            const action = this.textContent.trim();
            if (action !== '🚪 Logout') {
                showNotification(`Opening: ${action}`);
            } else {
                if (confirm('Are you sure you want to logout?')) {
                    showNotification('Logged out successfully!');
                }
            }
        });
    });

    // CTA button functionality
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Smooth scroll to products section
            const productsSection = document.querySelector('.products-section');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Helper function to perform search
function performSearch(searchTerm) {
    if (searchTerm.trim()) {
        showNotification(`Searching for: "${searchTerm}"`);
        // In a real application, you would implement actual search functionality here
        console.log('Search term:', searchTerm);
    } else {
        alert('Please enter a search term.');
    }
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show notifications
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        font-weight: 500;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add loading animation for buttons
function addLoadingState(button, originalText, loadingText) {
    button.textContent = loadingText;
    button.disabled = true;
    button.style.opacity = '0.7';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.opacity = '1';
    }, 1500);
}

// Initialize theme based on user preference
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.setAttribute('data-theme', 'dark');
        const themeSwitch = document.querySelector('.theme-switch');
        if (themeSwitch) {
            themeSwitch.classList.add('active');
        }
    }
}

// Save theme preference
function saveThemePreference() {
    const originalToggleTheme = window.toggleTheme;
    window.toggleTheme = function() {
        originalToggleTheme();
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    saveThemePreference();
});

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Add any responsive behavior here if needed
    console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close dropdowns
    if (e.key === 'Escape') {
        const dropdowns = document.querySelectorAll('.dropdown, .profile-dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
        });
    }
    
    // Enter key for search when focused on search input
    if (e.key === 'Enter' && e.target.classList.contains('header-search-input')) {
        performSearch(e.target.value);
    }
});

// Mobile menu handling for better UX
function handleMobileDropdowns() {
    if (window.innerWidth <= 768) {
        // Add click-to-toggle functionality for mobile
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                const dropdown = this.querySelector('.dropdown');
                const isVisible = dropdown.style.opacity === '1';
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown').forEach(d => {
                    d.style.opacity = '0';
                    d.style.visibility = 'hidden';
                });
                
                // Toggle current dropdown
                if (!isVisible) {
                    dropdown.style.opacity = '1';
                    dropdown.style.visibility = 'visible';
                }
            });
        });
        
        // Profile dropdown mobile handling
        document.querySelector('.profile-avatar').addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.querySelector('.profile-dropdown');
            const isVisible = dropdown.style.opacity === '1';
            
            if (!isVisible) {
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
            } else {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
            }
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-item') && !e.target.closest('.profile-avatar')) {
                document.querySelectorAll('.dropdown, .profile-dropdown').forEach(dropdown => {
                    dropdown.style.opacity = '0';
                    dropdown.style.visibility = 'hidden';
                });
            }
        });
    }
}

// Initialize mobile dropdown handling
document.addEventListener('DOMContentLoaded', function() {
    handleMobileDropdowns();
});

// Re-initialize on window resize
window.addEventListener('resize', function() {
    handleMobileDropdowns();
    
    // Reset dropdown styles on desktop
    if (window.innerWidth > 768) {
        document.querySelectorAll('.dropdown, .profile-dropdown').forEach(dropdown => {
            dropdown.style.opacity = '';
            dropdown.style.visibility = '';
        });
    }
});
