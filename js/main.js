// This is Africa - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Add header background on scroll for mobile
    const header = document.querySelector('header');
    
    function checkScroll() {
        if (window.innerWidth <= 768) {
            header.style.backgroundColor = 'white';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    checkScroll();
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Transform hamburger to X
            const bars = document.querySelectorAll('.bar');
            if (mobileMenuBtn.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && navMenu.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            
            const bars = document.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // Category Tabs Filtering
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            const parent = this.closest('section');
            let items;
            
            if (parent.id === 'africa-now') {
                items = document.querySelectorAll('.news-card');
            } else if (parent.id === 'africa-speaks') {
                items = document.querySelectorAll('.story-card');
            }
            
            if (items) {
                // Reset carousel position if it's the stories section
                if (parent.id === 'africa-speaks') {
                    const carousel = document.querySelector('.stories-carousel');
                    if (carousel) {
                        carousel.style.transform = 'translateX(0)';
                    }
                }
                
                if (category === 'all') {
                    items.forEach(item => {
                        if (parent.id === 'africa-speaks') {
                            item.style.display = 'flex';
                        } else {
                            item.style.display = 'block';
                        }
                    });
                } else {
                    items.forEach(item => {
                        if (item.getAttribute('data-category') === category) {
                            if (parent.id === 'africa-speaks') {
                                item.style.display = 'flex';
                            } else {
                                item.style.display = 'block';
                            }
                        } else {
                            item.style.display = 'none';
                        }
                    });
                }
            }
        });
    });
    
    // Stories Carousel
    const carousel = document.querySelector('.stories-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (carousel && prevBtn && nextBtn) {
        const storyCards = document.querySelectorAll('.story-card');
        let cardWidth = 380 + 32; // card width + margin
        let currentPosition = 0;
        let maxPosition = (storyCards.length - 1) * cardWidth;
        
        // Adjust visible cards based on screen width
        function updateCarousel() {
            // Reset position when switching tabs
            currentPosition = 0;
            carousel.style.transform = `translateX(0)`;
            
            // Adjust card width based on screen size
            if (window.innerWidth <= 768) {
                // On mobile, no need to adjust for carousel as we're displaying in block format
                storyCards.forEach(card => {
                    card.style.display = 'flex';
                });
            } else {
                cardWidth = 380 + 32; // card width + margin for desktop
                
                // Make all cards visible
                storyCards.forEach(card => {
                    card.style.display = 'flex';
                });
                
                maxPosition = (storyCards.length - 1) * cardWidth;
            }
        }
        
        // Initial setup
        updateCarousel();
        
        // Update on window resize
        window.addEventListener('resize', updateCarousel);
        
        // Next button functionality
        nextBtn.addEventListener('click', function() {
            // Only apply carousel functionality on desktop
            if (window.innerWidth > 768) {
                // Show 3 cards at a time on desktop
                const visibleCards = 3;
                const maxVisiblePosition = Math.max(0, (storyCards.length - visibleCards) * cardWidth);
                
                if (currentPosition < maxVisiblePosition) {
                    currentPosition += cardWidth;
                    carousel.style.transform = `translateX(-${currentPosition}px)`;
                } else {
                    // Loop back to start
                    currentPosition = 0;
                    carousel.style.transform = `translateX(0)`;
                }
            }
        });
        
        // Previous button functionality
        prevBtn.addEventListener('click', function() {
            // Only apply carousel functionality on desktop
            if (window.innerWidth > 768) {
                // Show 3 cards at a time on desktop
                const visibleCards = 3;
                const maxVisiblePosition = Math.max(0, (storyCards.length - visibleCards) * cardWidth);
                
                if (currentPosition > 0) {
                    currentPosition -= cardWidth;
                    carousel.style.transform = `translateX(-${currentPosition}px)`;
                } else {
                    // Loop to end
                    currentPosition = maxVisiblePosition;
                    carousel.style.transform = `translateX(-${maxVisiblePosition}px)`;
                }
            }
        });
        
        // Category tab filtering
        document.querySelectorAll('#africa-speaks .tab').forEach(tab => {
            tab.addEventListener('click', updateCarousel);
        });
    }
    
    // Load More Stories Button
    const loadMoreBtn = document.querySelector('.load-more button');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // This would typically fetch more news from an API
            // For demo purposes, we'll just show a message
            this.textContent = 'Loading...';
            
            setTimeout(() => {
                this.textContent = 'No More Stories';
                this.disabled = true;
                this.style.opacity = '0.5';
            }, 1500);
        });
    }
    
    // Simulated News API Integration
    // In a real application, this would fetch from actual news APIs
    function fetchLatestNews() {
        // Simulate API loading state
        const newsGrid = document.querySelector('.news-grid');
        if (newsGrid) {
            const loadingIndicator = document.createElement('div');
            loadingIndicator.className = 'loading-indicator';
            loadingIndicator.textContent = 'Fetching latest news...';
            loadingIndicator.style.textAlign = 'center';
            loadingIndicator.style.padding = '2rem';
            loadingIndicator.style.gridColumn = '1 / -1';
            
            // In a real app, you would append this while loading
            // newsGrid.appendChild(loadingIndicator);
            
            // Simulate API response time
            // setTimeout(() => {
            //     newsGrid.removeChild(loadingIndicator);
            //     // Then append new news items from the API
            // }, 2000);
        }
    }
    
    // Uncomment to simulate API calls
    // fetchLatestNews();
    
    // Newsletter Subscription
    const newsletterForm = document.querySelector('.footer-newsletter form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button');
            
            if (emailInput.value) {
                // In a real app, this would send the email to a server
                submitBtn.textContent = 'Subscribing...';
                
                setTimeout(() => {
                    submitBtn.textContent = 'Subscribed!';
                    emailInput.value = '';
                    
                    setTimeout(() => {
                        submitBtn.textContent = 'Subscribe';
                    }, 2000);
                }, 1500);
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                    
                    const bars = document.querySelectorAll('.bar');
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
                
                // Adjust offset based on screen size
                const offset = window.innerWidth <= 768 ? 60 : 20;
                
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate section elements when they come into view
    const animateSections = function() {
        const sections = document.querySelectorAll('section:not(.hero)');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        sections.forEach(section => {
            section.classList.add('section-animate');
            observer.observe(section);
        });
    };
    
    animateSections();
});