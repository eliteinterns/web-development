/*=============== MOBILE NAVIGATION ===============*/
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

/*=============== COUNTDOWN TIMER ===============*/
function updateCountdown() {
    const targetDate = new Date('May 15, 2025 09:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft <= 0) {
        document.getElementById('days').innerText = '00';
        document.getElementById('hours').innerText = '00';
        document.getElementById('minutes').innerText = '00';
        document.getElementById('seconds').innerText = '00';
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days < 10 ? '0' + days : days;
    document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
}

// Initial call and update every second
updateCountdown();
setInterval(updateCountdown, 1000);

/*=============== SCHEDULE TABS ===============*/
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Show corresponding content
        const dayId = btn.getAttribute('data-day');
        document.getElementById(dayId).classList.add('active');
    });
});

/*=============== REGISTRATION MODAL ===============*/
const modal = document.getElementById('registrationModal');
const registerBtns = document.querySelectorAll('#register-standard, #register-premium, #register-virtual');
const closeModal = document.querySelector('.close-modal');
const ticketTypeText = document.getElementById('selected-ticket-type');

registerBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();

        // Set selected ticket type
        let ticketType = '';
        if (btn.id === 'register-standard') {
            ticketType = 'Standard Pass - $499';
        } else if (btn.id === 'register-premium') {
            ticketType = 'Premium Pass - $799';
        } else if (btn.id === 'register-virtual') {
            ticketType = 'Virtual Pass - $249';
        }

        ticketTypeText.textContent = `Selected Package: ${ticketType}`;

        // Open modal
        modal.classList.add('active');
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
});

window.addEventListener('click', e => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

/*=============== FORM SUBMISSIONS ===============*/
const contactForm = document.getElementById('contactForm');
const registrationForm = document.getElementById('registrationForm');

if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

if (registrationForm) {
    registrationForm.addEventListener('submit', e => {
        e.preventDefault();
        alert('Registration successful! Check your email for confirmation details.');
        registrationForm.reset();
        modal.classList.remove('active');
    });
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}

/*=============== ACTIVE NAVIGATION ===============*/
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === current) {
            link.classList.add('active');
        }
    });
});

fetch('data.json')
  .then(response => response.json())
  .then(speakers => {
    const grid = document.querySelector('.speakers-grid');

    speakers.forEach(speaker => {
      const card = document.createElement('div');
      card.classList.add('speaker-card');

      card.innerHTML = `
        <div class="speaker-img">
          <img src="${speaker.image}" alt="${speaker.name}">
        </div>
        <div class="speaker-info">
          <h3>${speaker.name}</h3>
          <p>${speaker.title}</p>
          <div class="social-links">
            <a href="${speaker.links.website}" target="_blank" title="Website"><i>🔗</i></a>
            <a href="${speaker.links.linkedin}" target="_blank" title="LinkedIn"><i>📱</i></a>
            <a href="mailto:${speaker.links.email}" title="Email"><i>✉️</i></a>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });
  })
  .catch(error => console.error('Error loading speakers:', error));
