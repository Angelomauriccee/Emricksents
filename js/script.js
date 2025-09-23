// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initAnimations();
    
    // Initialize countdown
    initCountdown();
    
    // Initialize form interactions
    initFormInteractions();
});

// Main animation sequence
function initAnimations() {
    // Create a timeline for the main sequence
    const mainTimeline = gsap.timeline({
        defaults: {
            ease: "power3.out",
            duration: 1.2
        }
    });
    
    // Add animations to the timeline
    mainTimeline
        .to('.noise-overlay', { opacity: 0.03, duration: 2 })
        .to('header', { opacity: 1, y: 0, duration: 1 }, "-=1.5")
        .to('.content', { opacity: 1, y: 0, duration: 1.5 }, "-=0.8")
        .to('.subtitle', { opacity: 1, duration: 0.8 }, "-=1.2")
        .to('.title', { opacity: 1, duration: 1 }, "-=0.8")
        .to('.title::before, .title::after', { opacity: 1, width: "60px", duration: 1 }, "-=0.6")
        .to('.description', { opacity: 1, duration: 0.8 }, "-=0.6")
        .to('.countdown', { opacity: 1, duration: 0.8 }, "-=0.4")
        .to('.newsletter', { opacity: 1, duration: 0.8 }, "-=0.4")
        .to('footer', { opacity: 1, duration: 0.8 }, "-=0.4");
    
    // Animate decorative elements
    gsap.to('.shape-1', {
        opacity: 1,
        x: 50,
        y: 50,
        rotation: 360,
        duration: 60,
        repeat: -1,
        yoyo: true,
        ease: "none"
    });
    
    gsap.to('.shape-2', {
        opacity: 1,
        x: -30,
        y: -30,
        rotation: -360,
        duration: 70,
        repeat: -1,
        yoyo: true,
        ease: "none"
    });
    
    gsap.to('.shape-3', {
        opacity: 1,
        x: 20,
        y: -20,
        rotation: 180,
        duration: 50,
        repeat: -1,
        yoyo: true,
        ease: "none"
    });
    
    gsap.to('.shape-4', {
        opacity: 1,
        x: -40,
        y: 40,
        rotation: -180,
        duration: 65,
        repeat: -1,
        yoyo: true,
        ease: "none"
    });
    
    // Create hover animations for countdown items
    const countdownItems = document.querySelectorAll('.countdown-item');
    countdownItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item.querySelector('.count'), {
                scale: 1.1,
                color: '#d4af37',
                duration: 0.3
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item.querySelector('.count'), {
                scale: 1,
                color: '#ffffff',
                duration: 0.3
            });
        });
    });
    
    // Create hover animations for social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            gsap.to(icon, {
                y: -5,
                duration: 0.3
            });
        });
        
        icon.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                y: 0,
                duration: 0.3
            });
        });
    });
}

// Initialize countdown timer
function initCountdown() {
    // 🔒 Fixed launch date (example: September 20, 2025 at midnight)
    const countdownDate = new Date("Sep 26, 2025 00:00:00").getTime();

    // Update the countdown every second
    const countdownTimer = setInterval(() => {
        // Get current time
        const now = new Date().getTime();

        // Find the distance between now and the countdown date
        const distance = countdownDate - now;

        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result
        document.querySelector('.days').textContent = days.toString().padStart(2, '0');
        document.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
        document.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
        document.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');

        // When countdown finishes
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.querySelector('.countdown').innerHTML = "LAUNCHING NOW";
        }
    }, 1000);

    // Animate the countdown numbers on load
    const countElements = document.querySelectorAll('.count');
    countElements.forEach((el, index) => {
        gsap.from(el, {
            textContent: 0,
            duration: 2,
            ease: "power1.out",
            snap: { textContent: 1 },
            stagger: 0.25,
            delay: 1 + (index * 0.2)
        });
    });
}

// Initialize form interactions
function initFormInteractions() {
    const form = document.querySelector('form');
    const input = document.querySelector('input[type="email"]');
    const button = document.querySelector('.btn-notify');
    
    // Add focus animation to input
    input.addEventListener('focus', () => {
        gsap.to(input, {
            borderColor: '#d4af37',
            boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)',
            duration: 0.3
        });
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            gsap.to(input, {
                borderColor: 'rgba(212, 175, 55, 0.3)',
                boxShadow: 'none',
                duration: 0.3
            });
        }
    });
    
    // Add hover animation to button
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            backgroundColor: '#8a7129',
            scale: 1.05,
            duration: 0.3
        });
    });
    
    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            backgroundColor: '#d4af37',
            scale: 1,
            duration: 0.3
        });
    });
    
    // Form submission animation
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (input.value) {
            // Create success animation
            const formGroup = document.querySelector('.form-group');
            const originalContent = formGroup.innerHTML;
            
            // Animate form submission
            gsap.to(formGroup, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                onComplete: () => {
                    formGroup.innerHTML = '<div class="success-message">Thank you! We\'ll notify you soon.</div>';
                    
                    gsap.from('.success-message', {
                        opacity: 0,
                        y: 20,
                        duration: 0.5
                    });
                    
                    // Reset form after 3 seconds
                    setTimeout(() => {
                        gsap.to('.success-message', {
                            opacity: 0,
                            y: -20,
                            duration: 0.5,
                            onComplete: () => {
                                formGroup.innerHTML = originalContent;
                                
                                // Reinitialize event listeners
                                initFormInteractions();
                                
                                gsap.from(formGroup, {
                                    opacity: 0,
                                    y: 20,
                                    duration: 0.5
                                });
                            }
                        });
                    }, 3000);
                }
            });
        }
    });
}

// Add parallax effect on mouse move
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    gsap.to('.shape-1', {
        x: 50 + (mouseX * 20),
        y: 50 + (mouseY * 20),
        duration: 1
    });
    
    gsap.to('.shape-2', {
        x: -30 - (mouseX * 20),
        y: -30 - (mouseY * 20),
        duration: 1
    });
    
    gsap.to('.shape-3', {
        x: 20 + (mouseX * 10),
        y: -20 - (mouseY * 10),
        duration: 1
    });
    
    gsap.to('.shape-4', {
        x: -40 - (mouseX * 15),
        y: 40 + (mouseY * 15),
        duration: 1
    });
    
    // Subtle movement for the title
    gsap.to('.title', {
        x: (mouseX - 0.5) * 10,
        y: (mouseY - 0.5) * 10,
        duration: 1
    });
});

// Add a subtle animation to the logo
const logo = document.querySelector('.logo h1');
gsap.to(logo, {
    textShadow: '0 0 10px rgba(212, 175, 55, 0.7)',
    repeat: -1,
    yoyo: true,
    duration: 2
});

// Create a custom cursor effect
const createCustomCursor = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    // Style the cursor
    cursor.style.position = 'fixed';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.borderRadius = '50%';
    cursor.style.border = '1px solid rgba(212, 175, 55, 0.5)';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.transition = 'width 0.3s, height 0.3s, background-color 0.3s';
    
    // Create inner cursor
    const innerCursor = document.createElement('div');
    innerCursor.className = 'inner-cursor';
    cursor.appendChild(innerCursor);
    
    // Style inner cursor
    innerCursor.style.position = 'absolute';
    innerCursor.style.width = '5px';
    innerCursor.style.height = '5px';
    innerCursor.style.borderRadius = '50%';
    innerCursor.style.backgroundColor = 'rgba(212, 175, 55, 0.8)';
    innerCursor.style.top = '50%';
    innerCursor.style.left = '50%';
    innerCursor.style.transform = 'translate(-50%, -50%)';
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            left: e.clientX,
            top: e.clientY,
            duration: 0.1
        });
    });
    
    // Add hover effect
    const hoverElements = document.querySelectorAll('a, button, input, .countdown-item, .social-icon');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                duration: 0.3
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                width: '20px',
                height: '20px',
                backgroundColor: 'transparent',
                duration: 0.3
            });
        });
    });
};

// Initialize custom cursor on desktop devices
if (window.innerWidth > 768) {
    createCustomCursor();
    document.body.style.cursor = 'none';
}

// Add a subtle background animation
const createBackgroundEffect = () => {
    const canvas = document.createElement('canvas');
    canvas.className = 'background-canvas';
    document.body.appendChild(canvas);
    
    // Style the canvas
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.3';
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const ctx = canvas.getContext('2d');
    
    // Create particles
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            color: 'rgba(212, 175, 55, ' + (Math.random() * 0.2 + 0.1) + ')',
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25
        });
    }
    
    // Animate particles
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Move particle
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
    }
    
    animate();
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
};

// Initialize background effect
createBackgroundEffect();