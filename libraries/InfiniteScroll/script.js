let container = document.getElementById("imageContainer");
let loader = document.getElementById("loader");

let allImages = [];
let loadedCount = 0;
let cardsPerLoad = 0;

// Load JSON data
fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    allImages = data;
    cardsPerLoad = calculateCardsToFitScreen();
    loadMoreImages();
    window.addEventListener("scroll", handleScroll);
  });

  function calculateCardsToFitScreen() {
    const cardWidth = 300 + 20; 
    const cardHeight = 200 + 20; 
  
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
  
    const cardsPerRow = Math.floor(screenWidth / cardWidth);
    const rowsPerScreen = Math.floor(screenHeight / cardHeight);
  
    return cardsPerRow * (rowsPerScreen + 1); 
  }
  

function loadMoreImages() {
  const nextImages = allImages.slice(loadedCount, loadedCount + cardsPerLoad);

  nextImages.forEach((imgData) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = imgData.src;

    card.appendChild(img);
    container.appendChild(card);
  });

  loadedCount += nextImages.length;

  if (loadedCount >= allImages.length) {
    loader.textContent = "No more images";
    window.removeEventListener("scroll", handleScroll);
  }
}

function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    loader.textContent = "Loading...";
    setTimeout(loadMoreImages, 500);
  }
}

window.addEventListener('resize', () => {
  cardsPerLoad = calculateCardsToFitScreen(); 
});