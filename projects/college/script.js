/*=============== MOBILE NAVIGATION ===============*/
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

/*=============== SMOOTH SCROLLING ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }

        // Close mobile menu if open
        navMenu.classList.remove('active');
    });
});

/*=============== TAB FUNCTIONALITY ===============*/
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Deactivate all tabs
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Activate clicked tab
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

/*=============== FORM SUBMISSION ===============*/
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    alert(`Thank you, ${name}! Your message has been received. We'll get back to you soon.`);

    // Reset form
    contactForm.reset();
});

/*=============== HIGHLIGHT ACTIVE NAV ===============*/
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = 'home';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
            currentSection = section.getAttribute('id') || 'home';
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const section = link.getAttribute('data-section');
        if (section === currentSection) {
            link.classList.add('active');
        }
    });
});

/*=============== MENU CARDS ===============*/
fetch('data.json')
  .then(response => response.json())
  .then(programs => {
    const grid = document.querySelector('.programs-grid');

    programs.forEach(program => {
      const card = document.createElement('div');
      card.classList.add('program-card');

      card.innerHTML = `
        <div class="program-card-image" style="background-image: url('${program.image}')"></div>
        <div class="program-card-content">
          <h3>${program.title}</h3>
          <p>${program.description}</p>
          <a href="${program.link}" class="cta-button">Learn More</a>
        </div>
      `;

      grid.appendChild(card);
    });
  })
  .catch(error => console.error('Error loading program data:', error));