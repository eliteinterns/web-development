document.addEventListener('DOMContentLoaded', function () {
  const menuItemsContainer = document.querySelector('.menu-items');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const cartToggle = document.querySelector('.cart-toggle');
  const cartContainer = document.querySelector('.cart-container');
  const closeCart = document.querySelector('.close-cart');
  const cartItems = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.cart-total span:last-child');
  const cartCount = document.querySelector('.cart-toggle .count');
  const checkoutBtn = document.querySelector('.checkout-btn');
  const contactForm = document.querySelector('.contact-form');

  let menuItems = [];
  let cart = [];

  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      menuItems = data;
      displayMenuItems(menuItems);
      updateCart();
    })
    .catch(error => console.error('Error loading menu data:', error));

  function displayMenuItems(items) {
    if (!menuItemsContainer) return;
    menuItemsContainer.innerHTML = '';
    items.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.classList.add('menu-item');
      menuItem.innerHTML = `
        <div class="item-img"><img src="${item.image}" alt="${item.name}"></div>
        <div class="item-content">
          <div class="item-title">
            <h3>${item.name}</h3>
            <div class="item-price">$${item.price.toFixed(2)}</div>
          </div>
          <div class="item-desc">${item.description}</div>
          <button class="add-to-cart" data-id="${item.id}">Add to Order</button>
        </div>
      `;
      menuItemsContainer.appendChild(menuItem);
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', function () {
        const id = parseInt(this.dataset.id);
        addToCart(id);
      });
    });
  }

  function filterItems(category) {
    if (category === 'all') {
      displayMenuItems(menuItems);
    } else {
      const filteredItems = menuItems.filter(item => item.category === category);
      displayMenuItems(filteredItems);
    }
  }

  function addToCart(id) {
    const item = menuItems.find(item => item.id === id);
    const existingItem = cart.find(cartItem => cartItem.id === id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    updateCart();
    if (cartContainer) cartContainer.classList.add('active');
  }

  function updateCart() {
    if (!cartItems) return;
    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <div class="cart-item-title">
            <h4>${item.name}</h4>
            <div>$${(item.price * item.quantity).toFixed(2)}</div>
          </div>
          <div class="cart-item-quantity">
            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-btn increase" data-id="${item.id}">+</button>
          </div>
        </div>
      `;
      cartItems.appendChild(cartItem);
      total += item.price * item.quantity;
      count += item.quantity;
    });

    if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
    if (cartCount) cartCount.textContent = count;

    document.querySelectorAll('.decrease').forEach(btn => {
      btn.addEventListener('click', () => changeQuantity(parseInt(btn.dataset.id), -1));
    });

    document.querySelectorAll('.increase').forEach(btn => {
      btn.addEventListener('click', () => changeQuantity(parseInt(btn.dataset.id), 1));
    });
  }

  function changeQuantity(id, change) {
    const cartItem = cart.find(item => item.id === id);
    if (!cartItem) return;
    cartItem.quantity += change;
    if (cartItem.quantity <= 0) {
      cart = cart.filter(item => item.id !== id);
    }
    updateCart();
  }

  tabButtons.forEach(button => {
    button.addEventListener('click', function () {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      filterItems(this.dataset.category);
    });
  });

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  if (cartToggle) {
    cartToggle.addEventListener('click', () => {
      cartContainer.classList.add('active');
    });
  }

  if (closeCart) {
    closeCart.addEventListener('click', () => {
      cartContainer.classList.remove('active');
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function () {
      if (cart.length > 0) {
        alert('Thank you for your order!');
        cart = [];
        updateCart();
        cartContainer.classList.remove('active');
      } else {
        alert('Your cart is empty.');
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Your message has been sent!');
      this.reset();
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: 'smooth'
        });
      }
      navLinks.classList.remove('active');
    });
  });
});
