// Xexon Website JavaScript - Modern Crypto Financial

$(document).ready(function() {
    // Ensure modal is hidden and body scroll is enabled on page load
    const modal = document.getElementById('videoModal');
    const loader = document.getElementById('videoLoader');
    modal.classList.remove('show');
    loader.classList.remove('show');
    document.body.style.overflow = 'auto';
    // Smooth scrolling for navigation links
    $('.nav-link').on('click', function(e) {
        e.preventDefault();
        
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
        
        // Close mobile menu after clicking a link
        $('#mobile-menu').addClass('hidden');
    });
    
    // Mobile offside menu toggle
    $('#mobile-menu-btn').on('click', function() {
        const $btn = $(this);
        const $menu = $('#mobile-menu');
        const $overlay = $('#mobile-menu-overlay');
        
        $btn.toggleClass('active');
        $menu.removeClass('hidden translate-x-full');
        $overlay.removeClass('hidden');
        $('body').addClass('overflow-hidden');
    });
    
    // Close mobile menu
    function closeMobileMenu() {
        $('#mobile-menu-btn').removeClass('active');
        $('#mobile-menu').addClass('translate-x-full hidden');
        $('#mobile-menu-overlay').addClass('hidden');
        $('body').removeClass('overflow-hidden');
    }
    
    $('#mobile-menu-close, #mobile-menu-overlay').on('click', closeMobileMenu);
    
    // Close mobile menu when clicking nav links
    $('#mobile-menu .nav-link').on('click', function() {
        setTimeout(closeMobileMenu, 300);
    });
    
    // Sticky navbar effect on scroll with transparent overlay
    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();
        const navbar = $('#navbar');
        
        if (scrollTop > 100) {
            navbar.addClass('navbar-sticky');
            navbar.find('img').removeClass('h-12').addClass('h-10');
            navbar.find('.h-20').removeClass('h-20').addClass('h-16');
        } else {
            navbar.removeClass('navbar-sticky');
            navbar.find('img').removeClass('h-10').addClass('h-12');
            navbar.find('.h-16').removeClass('h-16').addClass('h-20');
        }
    });
    
    // Animate elements on scroll (optional enhancement)
    function animateOnScroll() {
        $('.animate-on-scroll').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate-fadeInUp');
            }
        });
    }
    
    // Add smooth animations to cards on scroll
    $(window).on('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
    
    // Add hover effects to CTA buttons
    $('.hover\\:scale-105').on('mouseenter', function() {
        $(this).addClass('transform scale-105');
    }).on('mouseleave', function() {
        $(this).removeClass('transform scale-105');
    });
    
    // Video Modal Close Functionality
    document.getElementById('closeVideoModal').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Close button clicked');
        closeVideoModal();
    });
    
    // Close modal when clicking outside video
    document.getElementById('videoModal').addEventListener('click', function(e) {
        if (e.target === this) {
            console.log('Clicked outside video, closing modal');
            closeVideoModal();
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || e.keyCode === 27) {
            console.log('ESC key pressed, closing modal');
            closeVideoModal();
        }
    });
    
    // Video loading handlers are now handled in openVideoModal function
    
    // Add event listeners to all video buttons
    $('.video-play-button').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const videoSrc = $(this).data('video-src');
        if (videoSrc) {
            openVideoModal(videoSrc);
        }
        
        return false;
    });
    
    // Add crypto-style animations to elements
    function addCryptoAnimations() {
        // Add crypto pattern to hero section
        $('#hero').addClass('crypto-pattern');
        
        // Add video button glow effect
        $('.video-play-button').addClass('video-play-btn');
        
        // Add crypto card effects to feature cards
        $('.bg-white').addClass('crypto-card');
    }
    
    // Enhanced button effects
    function addButtonEffects() {
        // Add ripple effect to buttons on click
        $('button.bg-primary-gold, button.border-primary-gold, .video-play-button, .btn, a.bg-primary-gold').on('click', function(e) {
            const button = $(this);
            const rect = this.getBoundingClientRect();
            const ripple = $('<span class="ripple"></span>');
            
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.css({
                width: size + 'px',
                height: size + 'px',
                left: x + 'px',
                top: y + 'px'
            });
            
            button.append(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Enhanced hover effects for play buttons
        $('.video-play-button').hover(
            function() {
                $(this).addClass('golden-flash-active');
            },
            function() {
                $(this).removeClass('golden-flash-active');
            }
        );
    }
    
    addCryptoAnimations();
    addButtonEffects();
});

// Scroll locking helper functions
function lockBodyScroll(scrollY) {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.paddingRight = scrollbarWidth > 0 ? `${scrollbarWidth}px` : '';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
  document.body.style.overflow = 'hidden';
}

function unlockBodyScroll(scrollY) {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
  window.scrollTo(0, scrollY);
}

// Video Modal Functions
function openVideoModal(videoSrc) {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    const loader = document.getElementById('videoLoader');
    const source = video.querySelector('source');
    
    // Ensure modal is direct child of body to avoid parent interference
    if (modal.parentNode !== document.body) {
        document.body.appendChild(modal);
    }
    
    // Store current scroll position and lock body scroll
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    modal.dataset.originalScrollTop = String(scrollY);
    lockBodyScroll(scrollY);
    
    // Set video source and add iOS Safari support
    source.src = videoSrc;
    video.setAttribute('playsinline', '');
    video.load();
    
    // Force modal to viewport center (override any parent transform effects)
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.zIndex = '999999';
    modal.style.transform = 'none';
    modal.style.backdropFilter = 'none';
    
    // Show modal and loader
    loader.classList.add('show');
    modal.classList.add('show');
    
    // Auto-play video when loaded
    const handleCanPlay = () => {
        loader.classList.remove('show');
        video.play().catch(() => loader.classList.remove('show'));
        video.removeEventListener('canplay', handleCanPlay);
    };
    
    const handleError = () => {
        loader.classList.remove('show');
        video.removeEventListener('error', handleError);
    };
    
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    const loader = document.getElementById('videoLoader');
    
    // Pause and reset video
    video.pause();
    video.currentTime = 0;
    
    // Hide modal and loader
    loader.classList.remove('show');
    modal.classList.remove('show');
    
    // Restore body scroll and position
    const originalScrollTop = parseInt(modal.dataset.originalScrollTop || '0');
    unlockBodyScroll(originalScrollTop);
    modal.dataset.originalScrollTop = '';
}

// Enhanced crypto-style scroll effects
function cryptoScrollEffects() {
    const scrolled = $(window).scrollTop();
    const rate = scrolled * -0.5;
    
    // Parallax effect for crypto patterns
    $('.crypto-pattern').css('background-position', `0 ${rate}px`);
    
    // Glowing effects for cards in viewport
    $('.crypto-card').each(function() {
        const cardTop = $(this).offset().top;
        const cardBottom = cardTop + $(this).outerHeight();
        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();
        
        if (cardBottom > viewportTop && cardTop < viewportBottom) {
            $(this).addClass('in-viewport');
        }
    });
}

$(window).on('scroll', cryptoScrollEffects);