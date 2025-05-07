
// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            navLinks.classList.remove('active');
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        question.classList.toggle('active');
        answer.classList.toggle('active');
    });
});

// Countdown Timer
const countdownDate = new Date("May 15, 2025 09:00:00").getTime();

const countdownFunction = setInterval(function () {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = String(days).padStart(2, '0');
    document.getElementById("hours").innerHTML = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerHTML = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerHTML = String(seconds).padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
    }
}, 1000);

// Form Submission
const registrationForm = document.querySelector('.register-form');

registrationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const profession = document.getElementById('profession').value;
    const skills = document.getElementById('skills').value;
    const team = document.getElementById('team').value;

    // Here you would normally send the data to a server
    // For now, we'll just show a success message

    registrationForm.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <h3>Thank you for registering, ${name}!</h3>
                    <p>We've sent a confirmation email to ${email}.</p>
                    <p>We look forward to seeing you at CodeCraft 2025!</p>
                </div>
            `;
});

// Animation on Scroll
window.addEventListener('scroll', function () {
    const featureCards = document.querySelectorAll('.feature-card');
    const timelineItems = document.querySelectorAll('.timeline-item');

    featureCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8;

        if (cardTop < triggerPoint) {
            card.style.opacity = '1';
        }
    });

    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8;

        if (itemTop < triggerPoint) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }
    });
});

// Initialize the scroll event once to handle elements already in view
document.dispatchEvent(new Event('scroll'));

// Sponsor Logo Hover Effect
const sponsorLogos = document.querySelectorAll('.sponsor-logo');

sponsorLogos.forEach(logo => {
    logo.addEventListener('mouseenter', () => {
        sponsorLogos.forEach(otherLogo => {
            if (otherLogo !== logo) {
                otherLogo.style.opacity = '0.3';
            }
        });
    });

    logo.addEventListener('mouseleave', () => {
        sponsorLogos.forEach(otherLogo => {
            otherLogo.style.opacity = '0.7';
        });
    });
});

// Add a simple preloader
window.addEventListener('load', function () {
    // Hide preloader if you had one
    // document.querySelector('.preloader').style.display = 'none';

    // Animate header content
    document.querySelector('.header-content').style.opacity = '1';
    document.querySelector('.header-content').style.transform = 'translateY(0)';
});

fetch('data.json')
  .then(response => response.json())
  .then(items => {
    const container = document.querySelector('.timeline-container');

    items.forEach(item => {
      const timelineItem = document.createElement('div');
      timelineItem.classList.add('timeline-item');

      timelineItem.innerHTML = `
        <div class="timeline-date">${item.date}</div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      `;

      container.appendChild(timelineItem);
    });
  })
  .catch(error => console.error('Error loading timeline data:', error));
