// Initialize map
const map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Load marker data from JSON
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(location => {
            L.marker([location.lat, location.lng])
                .addTo(map)
                .bindPopup(`<b>${location.name}</b><br>${location.info}`);
        });
    })
    .catch(error => console.error('Error loading JSON:', error));
