
// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 60,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Form submission
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Save original button text
    const originalBtnText = submitBtn.textContent;

    // Show sending state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (in a real site, this would be an AJAX request)
    setTimeout(() => {
        // Reset form
        contactForm.reset();

        // Show success message
        alert('Thank you for your message, ' + name + '! We will get back to you soon.');

        // Reset button
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }, 1500);
});

fetch('data.json')
  .then(response => response.json())
  .then(events => {
    const container = document.querySelector('.events-container');

    events.forEach(event => {
      const card = document.createElement('div');
      card.classList.add('event-card');

      card.innerHTML = `
        <div class="event-image" style="background-image: url('${event.image}')"></div>
        <div class="event-details">
          <span class="event-date">${event.date}</span>
          <h3 class="event-title">${event.title}</h3>
          <p>${event.description}</p>
          <a href="#" class="btn" onclick="showEventDetails('${event.title}')">Learn More</a>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => console.error('Error loading events:', error));

// Event Details Modal (simple alert version)
function showEventDetails(eventName) {
  alert('Event Details: ' + eventName + '\n\nCheck back soon for more information!');
}

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = '#' + section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
});