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

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

function addItemToCart(item) {
  const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({...item, quantity: 1 });
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCartTotal();
  displayCartItems();
}

function removeOneItemFromCart(index) {
  const itemToRemove = cartItems[index];
  if (itemToRemove.quantity > 1) {
    itemToRemove.quantity--;
  } else {
    cartItems.splice(index, 1);
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCartTotal();
  displayCartItems();
}

function updateCartTotal() {
  let totalCost = 0;
  cartItems.forEach((item) => {
    totalCost += item.price * item.quantity;
  });
  document.getElementById("cart-total").textContent = `Total: R ${totalCost.toFixed(2)}`;
}

function displayCartItems() {
  let cartItemsHTML = "";
  cartItems.forEach((item, index) => {
    cartItemsHTML += `
      <li>
        <span>${item.name} x ${item.quantity}</span>
        <span>R ${item.price * item.quantity}</span>
        <button onclick="removeOneItemFromCart(${index})">Remove one</button>
      </li>
    `;
  });
  document.getElementById("cart-items").innerHTML = cartItemsHTML;
}

function addItemToPurchasedItems(item) {
  purchasedItems.push(item);
  localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));
}

function displayPurchasedItems() {
  let purchasedItemsHTML = "";
  purchasedItems.forEach((item) => {
    purchasedItemsHTML += `
      <li>
        <span>${item.name} x ${item.quantity}</span>
        <span>R ${item.price * item.quantity}</span>
      </li>
    `;
  });
  document.getElementById("purchased-items").innerHTML = purchasedItemsHTML;
}

function clearAllItems() {
  const items = document.querySelectorAll(".checkout-items li");
  items.forEach((item) => {
    item.remove();
  });
  cartItems = [];
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCartTotal();
  displayCartItems();
}

document.getElementById("clear-button").addEventListener("click", clearAllItems);


displayCartItems();
updateCartTotal();
displayPurchasedItems();