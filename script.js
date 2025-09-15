document.addEventListener('DOMContentLoaded', () => {

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial-item');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (i === index) {
                testimonial.classList.add('active');
            }
        });
    }

    if (testimonials.length > 0) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000); // Change testimonial every 5 seconds
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isOpened = answer.style.maxHeight && answer.style.maxHeight !== '0px';

            // Close all answers
            faqItems.forEach(i => {
                i.querySelector('.faq-answer').style.maxHeight = '0px';
                i.querySelector('.faq-question').classList.remove('active');
            });

            // If this one wasn't open, open it
            if (!isOpened) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                question.classList.add('active');
            }
        });
    });

    // Hero Section Particle Animation
    const heroAnimationContainer = document.getElementById('hero-animation');
    if (heroAnimationContainer) {
        const canvas = document.createElement('canvas');
        heroAnimationContainer.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        let particles = [];
        const particleCount = 100;

        function resizeCanvas() {
            canvas.width = heroAnimationContainer.offsetWidth;
            canvas.height = heroAnimationContainer.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.color = 'rgba(255, 255, 255, 0.5)';
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.size > 0.2) this.size -= 0.01;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        initParticles();

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // 3D Card Hover Effect
    gsap.registerPlugin(ScrollTrigger);
    const cards = document.querySelectorAll('.pricing-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20; // Divide to reduce sensitivity
            const rotateY = (centerX - x) / 20;

            gsap.to(card, {
                duration: 0.5,
                rotationX: rotateX,
                rotationY: rotateY,
                scale: 1.05,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 1,
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });

    // Scroll-Triggered Animations for Features
    gsap.from(".feature-item", {
        scrollTrigger: {
            trigger: ".features-section",
            start: "top 80%", // Trigger when the top of the section is 80% from the top of the viewport
            toggleActions: "play none none none"
        },
        duration: 1,
        opacity: 0,
        y: 50,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Hero Parallax Effect
    gsap.to("#hero-animation", {
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            scrub: 1.5 // A value of 1.5 provides a smooth, noticeable scrub effect
        },
        y: 250, // Move the background down by 250px as the user scrolls through the section
        ease: "none"
    });
});
