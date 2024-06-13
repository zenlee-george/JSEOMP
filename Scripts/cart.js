// Navbar
function togglemenu() {
  document.querySelectorAll(".nav-container").forEach((item) => {
    item.classList.toggle("show-menu");
  });
  document.querySelectorAll(".nav").forEach((item) => {
    item.classList.toggle("show-menu");
  });
  document.querySelector(".navbutton").classList.toggle("show-menu");
}

document.querySelector(".navbutton").addEventListener("mouseover", () => {
  document.querySelector(".bar-top").classList.add("move");
  document.querySelector(".bar-middle").classList.add("move");
  document.querySelector(".bar-bottom").classList.add("move");
});

document.querySelector(".navbutton").addEventListener("mouseout", () => {
  document.querySelector(".bar-top").classList.remove("move");
  document.querySelector(".bar-middle").classList.remove("move");
  document.querySelector(".bar-bottom").classList.remove("move");
});

// cart.js

let cartItems = [];

// function to add item to cart
function addItemToCart(item) {
  cartItems.push(item);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartTotal();
}

// function to remove item from cart
function removeItemFromCart(index) {
  cartItems.splice(index, 1);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartTotal();
  displayCartItems();
}

// function to update cart total
function updateCartTotal() {
  let totalCost = 0;
  cartItems.forEach(item => {
    totalCost += item.price * item.quantity;
  });
  document.getElementById('cart-total').textContent = `Total: R ${totalCost.toFixed(2)}`;
}

// function to display cart items
function displayCartItems() {
  let cartItemsHTML = '';
  cartItems.forEach((item) => {
    cartItemsHTML += `
      <li>
        <span>${item.name} x ${item.quantity}</span>
        <span>R ${item.price * item.quantity}</span>
        <button onclick="removeItemFromCart(${cartItems.indexOf(item)})">Remove</button>
      </li>
    `;
  });
  document.getElementById('cart-items').innerHTML = cartItemsHTML;
}

// function to handle checkout
function checkout() {
  const checkoutContainer = document.getElementById('checkout-container');
  checkoutContainer.innerHTML = `
    <h2>Payment Options</h2>
    <p>Choose a payment method:</p>
    <ul>
      <li>Credit Card</li>
      <li>PayPal</li>
      <li>Bank Transfer</li>
    </ul>
  `;
}

// load cart items from local storage
cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// display cart items
displayCartItems();

// update cart total
updateCartTotal();

// add event listener to checkout button
document.getElementById('checkout').addEventListener('click', checkout);