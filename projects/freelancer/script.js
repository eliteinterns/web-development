/*=============== MOBILE NAVIGATION ===============*/
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

/*=============== SMOOTH SCROLLING ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenu.textContent = '☰';
        }

        const target = document.querySelector(this.getAttribute('href'));

        window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

/*=============== TESTIMONIAL SLIDER ===============*/
const testimonials = document.querySelectorAll('.testimonial');
const prevButton = document.getElementById('prev-testimonial');
const nextButton = document.getElementById('next-testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    testimonials[index].classList.add('active');
}

nextButton.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
});

prevButton.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
});

/*=============== FORM SUBMISSION ===============*/
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // In a real implementation, you would send this data to a server
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // For demonstration, show alert
    alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
    contactForm.reset();
});

// Scroll Animation for Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

fetch('data.json')
  .then(response => response.json())
  .then(items => {
    const grid = document.querySelector('.portfolio-grid');

    items.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('portfolio-item');

      div.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="portfolio-overlay">
          <h3>${item.title}</h3>
        </div>
      `;

      grid.appendChild(div);
    });
  })
  .catch(error => console.error('Error loading portfolio:', error));
