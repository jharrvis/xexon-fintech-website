// Xexon Website - Simple & Working JavaScript

$(document).ready(function() {
    
    // ==========================================
    // NAVBAR STICKY - Simple Implementation
    // ==========================================
    
    function handleNavbarScroll() {
        const scrollTop = $(window).scrollTop();
        const navbar = $('#navbar');
        
        if (scrollTop > 50) {
            navbar.addClass('scrolled');
            navbar.find('img').removeClass('h-12').addClass('h-10');
        } else {
            navbar.removeClass('scrolled');
            navbar.find('img').removeClass('h-10').addClass('h-12');
        }
    }
    
    // Initialize navbar
    handleNavbarScroll();
    $(window).scroll(handleNavbarScroll);
    
    // ==========================================
    // SCROLL TO TOP BUTTON
    // ==========================================
    
    const scrollBtn = $('#scrollToTopBtn');
    
    function toggleScrollButton() {
        const scrollTop = $(window).scrollTop();
        
        if (scrollTop > 300) {
            scrollBtn.addClass('show');
        } else {
            scrollBtn.removeClass('show');
        }
    }
    
    // Initialize scroll button
    toggleScrollButton();
    $(window).scroll(toggleScrollButton);
    
    // Click event for scroll to top
    scrollBtn.click(function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
    });
    
    // ==========================================
    // MOBILE MENU
    // ==========================================
    
    $('#mobile-menu-btn').click(function() {
        $(this).toggleClass('active');
        $('#mobile-menu').removeClass('translate-x-full');
        $('#mobile-menu-overlay').removeClass('hidden');
        $('body').addClass('overflow-hidden');
    });
    
    function closeMobileMenu() {
        $('#mobile-menu-btn').removeClass('active');
        $('#mobile-menu').addClass('translate-x-full');
        $('#mobile-menu-overlay').addClass('hidden');
        $('body').removeClass('overflow-hidden');
    }
    
    $('#mobile-menu-close, #mobile-menu-overlay').click(closeMobileMenu);
    $('#mobile-menu .nav-link').click(function() {
        setTimeout(closeMobileMenu, 300);
    });
    
    // ==========================================
    // SMOOTH SCROLLING
    // ==========================================
    
    $('.nav-link').click(function(e) {
        const href = $(this).attr('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = $(href);
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 800);
            }
        }
    });
    
    // ==========================================
    // VIDEO MODAL
    // ==========================================
    
    // Open video modal
    $('[data-modal-target="video-modal"]').click(function() {
        const videoSrc = $(this).data('video-src');
        const modal = $('#video-modal');
        const video = $('#modal-video');
        
        if (videoSrc) {
            video.attr('src', videoSrc);
            video[0].load();
            
            modal.removeClass('hidden').addClass('flex');
            $('body').addClass('overflow-hidden');
            
            setTimeout(function() {
                video[0].play().catch(function(error) {
                    console.log('Video autoplay blocked:', error);
                });
            }, 300);
        }
    });
    
    // Close video modal
    function closeVideoModal() {
        const modal = $('#video-modal');
        const video = $('#modal-video');
        
        video[0].pause();
        video[0].currentTime = 0;
        video.attr('src', '');
        
        modal.removeClass('flex').addClass('hidden');
        $('body').removeClass('overflow-hidden');
    }
    
    $('[data-modal-hide="video-modal"]').click(closeVideoModal);
    
    $('#video-modal').click(function(e) {
        if (e.target === this) {
            closeVideoModal();
        }
    });
    
    $(document).keydown(function(e) {
        if (e.key === 'Escape' && $('#video-modal').hasClass('flex')) {
            closeVideoModal();
        }
    });
    
    // ==========================================
    // BUTTON HOVER EFFECTS
    // ==========================================
    
    $('.hover\\:scale-105').hover(
        function() { $(this).addClass('transform scale-105'); },
        function() { $(this).removeClass('transform scale-105'); }
    );
    
    console.log('✅ All Xexon website functionality initialized successfully!');
    
});