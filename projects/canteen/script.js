// Event Details Modal
const eventBtns = document.querySelectorAll('.event-details-btn');
const modal = document.getElementById('event-modal');
const modalTitle = document.getElementById('modal-title');
const modalDetails = document.getElementById('modal-details');
const closeModalBtn = document.querySelector('.close-modal');
const eventsList = document.querySelector('.events-list');

// Load from data.json
fetch('data.json')
  .then(response => response.json())
  .then(events => {
    events.forEach(event => {
      const li = document.createElement('li');
      li.classList.add('event-item');

      li.innerHTML = `
        <div class="event-date">
            <div class="month">${event.month}</div>
            <div class="day">${event.day}</div>
        </div>
        <div class="event-info">
            <h3>${event.title}</h3>
            <p>${event.summary}</p>
        </div>
        <button class="event-details-btn" data-event="${event.title}">Details</button>
      `;

      eventsList.appendChild(li);
    });

    // Attach event listeners after DOM is updated
    document.querySelectorAll('.event-details-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const title = e.target.getAttribute('data-event');
        const event = events.find(ev => ev.title === title);
        modalTitle.textContent = event.title;
        modalDetails.textContent = event.details;
        modal.style.display = 'flex';
      });
    });
  })
  .catch(error => console.error('Failed to load events:', error));

// Close modal
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});


// Form submission
const submitBtn = document.getElementById('submit-form');
submitBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (name && email && subject && message) {
        alert('Thank you for your message! We will get back to you soon.');
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('message').value = '';
    } else {
        alert('Please fill out all fields.');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 60,
            behavior: 'smooth'
        });
    });
});

// Back to top button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});