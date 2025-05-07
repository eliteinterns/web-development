/*=============== MOBILE NAVIGATION ===============*/
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');

            navLinks.forEach(link => {
                link.style.animation = '';
            });
        });
    });
}

navSlide();

/*===============SMOOTH SCROLLING ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        if (this.getAttribute('href') !== '#') {
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, 
                    behavior: 'smooth'
                });
            }
        }
    });
});

/*=============== TESTIMONIAL SLIDER ===============*/
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const list = document.querySelector('.testimonial-list');
    let currentTestimonial = 0;

    data.forEach((item, index) => {
      const div = document.createElement('div');
      div.classList.add('testimonial');
      if (index === 0) div.classList.add('active');

      div.innerHTML = `
        <p>"${item.quote}"</p>
        <p class="client">${item.client}</p>
        <p class="position">${item.position}</p>
      `;
      list.appendChild(div);
    });

    const testimonials = document.querySelectorAll('.testimonial');

    function showTestimonial(index) {
      testimonials.forEach(t => t.classList.remove('active'));
      testimonials[index].classList.add('active');
    }

    document.getElementById('next-btn').addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    });

    document.getElementById('prev-btn').addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentTestimonial);
    });

    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 5000);
  })
  .catch(err => console.error('Failed to load testimonials:', err));

/*=============== FORM SUBMISSION HANDLER ===============*/
const form = document.getElementById('signup-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const formProps = Object.fromEntries(formData);

    alert(`Thank you, ${formProps.name}! Your free trial request has been received. We'll send details to ${formProps.email} shortly.`);
    form.reset();
});