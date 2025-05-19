/*=============== MOBILE NAVIGATION ===============*/
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

/*=============== SMOOTH SCROLLING FOR NAVIGATION LINKS ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Close mobile menu after clicking
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

/*=============== FORM SUBMISSION ===============*/
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Normally would send data to server here
    alert('Thanks for your message! We\'ll get back to you soon.');
    contactForm.reset();
});

/*=============== SCROLL ANIMATION FOR MENU ITEMS ===============*/
const menuItems = document.querySelectorAll('.menu-item');

window.addEventListener('scroll', () => {
    const triggerBottom = window.innerHeight * 0.8;

    menuItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;

        if (itemTop < triggerBottom) {
            item.style.opacity = 1;
            item.style.transform = 'translateY(0)';
        } else {
            item.style.opacity = 0;
            item.style.transform = 'translateY(50px)';
        }
    });
});

/*=============== INITIALIZE THE MENU ITEM WITH OPACITY ===============*/
menuItems.forEach(item => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

/*=============== TRIGGER SCROLL EVENT TO CHECK INITITAL VISIBILITY ===============*/
window.dispatchEvent(new Event('scroll'));

/*=============== MENU CARDS ===============*/
fetch('data.json')
    .then(response => response.json())
    .then(events => {
        const grid = document.querySelector('.menu-grid');

        events.forEach(event => {
            const card = document.createElement('div');
            card.classList.add('menu-item');

            card.innerHTML = `
        <img alt="${event.title}" src="${event.image}">
        <div class="menu-item-content">
          <h3>${event.title}</h3>
          <p>${event.description}</p>
          <div class="price">${event.price}</div>
        </div>
      `;

            grid.appendChild(card); 
        });
    })
    .catch(error => console.error('Error loading menu items:', error));
