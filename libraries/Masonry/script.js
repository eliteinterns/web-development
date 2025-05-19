// Fetch data from JSON
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const grid = document.querySelector('.grid');

    // Create image elements
    data.forEach(item => {
      const gridItem = document.createElement('div');
      gridItem.className = 'grid-item';

      const img = document.createElement('img');
      img.className = 'grid-image';
      img.src = item.src;
      img.alt = '';
      img.loading = 'lazy';

      gridItem.appendChild(img);
      grid.appendChild(gridItem);
    });

    // Initialize Masonry after images load
    imagesLoaded(grid, () => {
      new Masonry(grid, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-item',
        percentPosition: true,
        gutter: 20,
        transitionDuration: '0.3s'
      });
    });
  })
  .catch(error => console.error('Error:', error));