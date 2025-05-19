document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
      .then(r => r.ok ? r.json() : Promise.reject(`Status ${r.status}`))
      .then(items => {
        const gallery = document.getElementById('gallery');
        items.forEach(item => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `
            <a href="${item.image}"
               class="glightbox"
               data-gallery="gallery1"
               data-title="${item.title}">
              <img src="${item.image}" alt="${item.title}">
            </a>
            <div class="card-title">${item.title}</div>
          `;
          gallery.appendChild(card);
        });
  
        // Initialize GLightbox with proper configuration
        const lightbox = GLightbox({
          selector: '.glightbox',
          touchNavigation: true,
          keyboardNavigation: true,
          onOpen: () => {
            const gallery = document.getElementById('gallery');
            if (document.activeElement?.closest('#gallery')) {
              document.activeElement.blur();
            }
          }
        });
      })
      .catch(err => console.error('Error loading gallery data:', err));
  });