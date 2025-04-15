// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const backToTopBtn = document.getElementById('back-to-top');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const currentDateEl = document.getElementById('current-date');
const currentYearEl = document.getElementById('current-year');
const newsletterForm = document.getElementById('newsletter-form');
const commentCountEl = document.getElementById('comment-count');
const searchInput = document.getElementById('search-input');
const stockTicker = document.getElementById('stock-ticker');
const marketStatus = document.getElementById('market-status');
const newsAlert = document.getElementById('news-alert');
const alertClose = document.getElementById('alert-close');
const carouselTrack = document.getElementById('carousel-track');
const carouselPrev = document.getElementById('carousel-prev');
const carouselNext = document.getElementById('carousel-next');
const carouselDots = document.getElementById('carousel-dots');
const newsMarquee = document.getElementById('news-marquee');
const sidebarNewsletter = document.getElementById('sidebar-newsletter');

// Set current date and year
function setDateTime() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    currentDateEl.textContent = now.toLocaleDateString('en-US', options);
    currentYearEl.textContent = now.getFullYear();
}

// Mobile menu toggle
function setupMobileMenu() {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Change icon based on menu state
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Back to top button functionality
function setupBackToTop() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Lightbox functionality
function openLightbox(imgSrc) {
    lightboxImg.src = imgSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
}

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Handle escape key to close lightbox
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// Newsletter form submission
function setupNewsletterForm() {
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value;
            
            // Simulate form submission
            const submitBtn = newsletterForm.querySelector('button');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                alert(`Thank you! ${email} has been subscribed to our newsletter.`);
                newsletterForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Sidebar newsletter form
    if (sidebarNewsletter) {
        sidebarNewsletter.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = sidebarNewsletter.querySelector('input').value;
            
            // Simulate form submission
            const submitBtn = sidebarNewsletter.querySelector('button');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                alert(`Thank you! ${email} has been subscribed to our newsletter.`);
                sidebarNewsletter.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Search functionality
function setupSearch() {
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    alert(`Searching for: ${searchTerm}`);
                    // In a real application, this would redirect to search results page
                }
            }
        });
    }
}

// Animate stock ticker
function animateStockTicker() {
    if (!stockTicker) return;

    // Clone stock items for continuous scrolling effect
    const items = stockTicker.querySelectorAll('.stock-item');
    items.forEach(item => {
        const clone = item.cloneNode(true);
        stockTicker.appendChild(clone);
    });

    // Update market status based on time
    const now = new Date();
    const hour = now.getHours();
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;

    if (isWeekend || hour < 10 || hour > 15) {
        marketStatus.textContent = 'Market Closed';
        marketStatus.style.color = 'var(--secondary-color)';
    } else {
        marketStatus.textContent = 'Market Open';
        marketStatus.style.color = 'var(--accent-color)';
    }
}

// Add comment functionality
function setupComments() {
    // Simulate random comment count
    const randomComments = Math.floor(Math.random() * 20);
    commentCountEl.textContent = randomComments;

    // Add click event to comment count to simulate opening comments
    commentCountEl.parentElement.style.cursor = 'pointer';
    commentCountEl.parentElement.addEventListener('click', () => {
        alert(`${randomComments} comments on this article. Comment section would open here.`);
    });
}

// Add animation to gallery images
function setupGalleryAnimations() {
    const galleryImages = document.querySelectorAll('.gallery-img');

    galleryImages.forEach(img => {
        img.classList.add('fade-in');
        
        // Add staggered animation effect
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('slide-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(img);
    });
}

// News Alert Popup
function setupNewsAlert() {
    if (!newsAlert) return;
    
    // Show alert after a short delay
    setTimeout(() => {
        newsAlert.classList.add('active');
    }, 2000);
    
    // Close alert when clicking the close button
    alertClose.addEventListener('click', () => {
        newsAlert.classList.remove('active');
    });
    
    // Close alert when clicking outside
    newsAlert.addEventListener('click', (e) => {
        if (e.target === newsAlert) {
            newsAlert.classList.remove('active');
        }
    });
    
    // Close alert with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && newsAlert.classList.contains('active')) {
            newsAlert.classList.remove('active');
        }
    });
}

// Carousel functionality
function setupCarousel() {
    if (!carouselTrack) return;
    
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    const slideWidth = slides[0].clientWidth;
    let currentIndex = 0;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        carouselDots.appendChild(dot);
    });
    
    // Set initial position
    updateCarousel();
    
    // Previous button click
    carouselPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    });
    
    // Next button click
    carouselNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    });
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    // Update carousel position and active dot
    function updateCarousel() {
        carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active dot
        const dots = carouselDots.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Auto advance slides
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }, 5000);
}

// Marquee functionality
function setupMarquee() {
    if (!newsMarquee) return;
    
    // Clone marquee items for continuous scrolling
    const items = newsMarquee.querySelectorAll('span');
    items.forEach(item => {
        const clone = item.cloneNode(true);
        newsMarquee.appendChild(clone);
    });
}

// Icon Cloud Animation
function setupIconCloud() {
    const cloudItems = document.querySelectorAll('.cloud-item');
    
    cloudItems.forEach((item, index) => {
        // Add random animation delay
        const delay = Math.random() * 2;
        item.style.animationDelay = `${delay}s`;
        
        // Add hover effect
        item.addEventListener('mouseover', () => {
            item.classList.add('pulse');
        });
        
        item.addEventListener('mouseout', () => {
            item.classList.remove('pulse');
        });
    });
}

// Show welcome popup on first visit
function showWelcomePopup() {
    // Check if this is the first visit
    if (!localStorage.getItem('visited')) {
        // Create welcome popup
        const welcomePopup = document.createElement('div');
        welcomePopup.className = 'news-alert active';
        welcomePopup.innerHTML = `
            <div class="alert-content">
                <div class="alert-header">
                    <h3>Welcome to Online Khabar</h3>
                    <span class="alert-close" id="welcome-close">&times;</span>
                </div>
                <div class="alert-body">
                    <img src="https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg" alt="Welcome" class="alert-img">
                    <h4>Nepal's #1 News Portal</h4>
                    <p>Thank you for visiting Online Khabar. Stay updated with the latest news, analysis, and features.</p>
                    <button class="shimmer-btn" id="welcome-btn">Get Started</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(welcomePopup);
        
        // Close popup handlers
        const closeBtn = document.getElementById('welcome-close');
        const startBtn = document.getElementById('welcome-btn');
        
        closeBtn.addEventListener('click', () => {
            welcomePopup.remove();
        });
        
        startBtn.addEventListener('click', () => {
            welcomePopup.remove();
        });
        
        welcomePopup.addEventListener('click', (e) => {
            if (e.target === welcomePopup) {
                welcomePopup.remove();
            }
        });
        
        // Set visited flag
        localStorage.setItem('visited', 'true');
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setDateTime();
    setupMobileMenu();
    setupBackToTop();
    setupNewsletterForm();
    setupSearch();
    animateStockTicker();
    setupComments();
    setupGalleryAnimations();
    setupNewsAlert();
    setupCarousel();
    setupMarquee();
    setupIconCloud();
    showWelcomePopup();

    // Add fade-in animation to news cards
    document.querySelectorAll('.news-card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 200);
    });
    
    // Add animation to tweet cards
    document.querySelectorAll('.tweet-card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
            card.classList.add('slide-in');
        }, 500 + index * 300);
    });
});

// Font Awesome replacement (minimal implementation)
// This is a simple implementation to avoid using external CDN
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .fas, .far, .fab {
            display: inline-block;
            width: 1em;
            height: 1em;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
        .fa-bars:before { content: '☰'; }
        .fa-times:before { content: '✕'; }
        .fa-globe:before { content: '🌐'; }
        .fa-heartbeat:before { content: '♥'; }
        .fa-user-circle:before { content: '👤'; }
        .fa-search:before { content: '🔍'; }
        .fa-clock:before { content: '🕒'; }
        .fa-comment:before { content: '💬'; }
        .fa-arrow-up:before { content: '↑'; }
        .fa-facebook-f:before { content: 'f'; }
        .fa-twitter:before { content: 't'; }
        .fa-instagram:before { content: 'i'; }
        .fa-youtube:before { content: 'y'; }
        .fa-heart:before { content: '♥'; }
        .fa-retweet:before { content: '↻'; }
        .fa-virus:before { content: '🦠'; }
        .fa-landmark:before { content: '🏛️'; }
        .fa-futbol:before { content: '⚽'; }
        .fa-mountain:before { content: '⛰️'; }
        .fa-chart-line:before { content: '📈'; }
        .fa-film:before { content: '🎬'; }
        .fa-graduation-cap:before { content: '🎓'; }
        .fa-tractor:before { content: '🚜'; }
        .fa-globe-asia:before { content: '🌏'; }
    `;
    document.head.appendChild(style);
});