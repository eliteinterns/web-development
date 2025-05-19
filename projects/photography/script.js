// DOM Elements
const gallery = document.querySelector('.gallery');
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal-img');
const modalCaption = document.querySelector('.modal-caption');
const closeModal = document.querySelector('.close-modal');
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');
const contactForm = document.getElementById('contactForm');

// Load Gallery Items from data.json
function loadGallery() {
    fetch('data.json')
        .then(response => response.json())
        .then(galleryItems => {
            galleryItems.forEach(item => {
                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');
                galleryItem.dataset.id = item.id;

                galleryItem.innerHTML = `
                    <img src="${item.imgSrc}" alt="${item.title}" class="gallery-img">
                    <div class="gallery-caption">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                    </div>
                `;

                gallery.appendChild(galleryItem);
            });
        })
        .catch(error => {
            console.error('Error loading gallery data:', error);
        });
}

// Initialize Gallery
loadGallery();

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            if (mobileMenuBtn.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navMenu.style.display = 'none';
            }
        });
    });

    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', function () {
        this.classList.toggle('active');
        navMenu.style.display = this.classList.contains('active') ? 'flex' : 'none';
    });

    // Gallery Item Click - Open Modal
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function () {
            const id = parseInt(this.dataset.id);
            const galleryItem = galleryItems.find(item => item.id === id);

            if (galleryItem) {
                modalImg.src = galleryItem.imgSrc;
                modalImg.alt = galleryItem.title;
                modalCaption.innerHTML = `<h3>${galleryItem.title}</h3><p>${galleryItem.description}</p>`;
                modal.classList.add('active');
            }
        });
    });

    // Close Modal
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close Modal when clicking outside of content
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Contact Form Submission
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Simple form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        if (name && email && subject && message) {
            // In a real application, you would send this data to a server
            alert('Thank you for your message! I will contact you soon.');
            this.reset();
        } else {
            alert('Please fill in all fields');
        }
    });
});

// Intersection Observer for Animation on Scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe section titles and other elements for animations
document.querySelectorAll('.section-title, .about-img, .about-content, .gallery-item').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});