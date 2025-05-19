fetch('data.json')
  .then(response => response.json())
  .then(banners => {
    const wrapper = document.getElementById("banner-wrapper");

    banners.forEach(banner => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");

      const img = document.createElement("img");
      img.src = banner.src;
      img.alt = banner.alt;
      img.loading = "lazy";

      slide.appendChild(img);
      wrapper.appendChild(slide);
    });

    // Initialize Swiper after slides are added
    new Swiper(".mySwiper", {
      loop: true,
      effect: "fade",
      fadeEffect: { crossFade: true },
      speed: 800,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      keyboard: { enabled: true },
      mousewheel: { forceToAxis: true },
      grabCursor: true,
      simulateTouch: true,
      touchRatio: 0.6,
      touchAngle: 30,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      observer: true,
      observeParents: true,
      breakpoints: {
        320: { spaceBetween: 10 },
        768: { spaceBetween: 20 },
      },
    });
  })
  .catch(error => console.error("Error loading banners:", error));