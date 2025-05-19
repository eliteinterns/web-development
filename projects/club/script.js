/*=============== MOBILE MENU TOGGLE ===============*/
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
	navLinks.classList.toggle('active');
});

/*=============== SMOOTH SCROLLING FOR NAVIGATION LINKS ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function(e) {
		e.preventDefault();
		navLinks.classList.remove('active');
		const targetId = this.getAttribute('href');
		const targetElement = document.querySelector(targetId);
		window.scrollTo({
			top: targetElement.offsetTop - 60,
			behavior: 'smooth'
		});
	});
});

/*=============== FORM SUBMISSION HANDLER ===============*/
const form = document.getElementById('membership-form');
form.addEventListener('submit', function(e) {
	e.preventDefault();
	// Get form values
	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	// Display success message
	form.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <h3 style="margin-bottom: 1rem;">Thank you, ${name}!</h3>
                    <p>Your application has been submitted successfully.</p>
                    <p>We'll send a confirmation to ${email} shortly.</p>
                </div>
            `;
});

/*=============== EVENT CARDS AND HOVER EFFECT ENHANCEMENT ===============*/
fetch('data.json')
  .then(response => response.json())
  .then(events => {
    const grid = document.querySelector('.events-grid');

    events.forEach(event => {
      const card = document.createElement('div');
      card.classList.add('event-card');

      card.innerHTML = `
        <div class="event-image"><img alt="${event.title}" src="${event.image}"></div>
        <div class="event-details">
          <div class="event-date">${event.date}</div>
          <h3 class="event-title">${event.title}</h3>
          <p>${event.description}</p>
        </div>
      `;

      // Add hover effect
      card.addEventListener('mouseenter', function () {
        this.style.boxShadow = '0 10px 25px rgba(52, 152, 219, 0.3)';
      });
      card.addEventListener('mouseleave', function () {
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
      });

      grid.appendChild(card);
    });
  })
  .catch(error => console.error('Error loading events:', error));