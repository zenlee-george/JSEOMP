let cart = JSON.parse(localStorage.getItem('cartItems'));
if (!cart) {
  cart = [];
}

function updateCartCount() {
  const cartCount = cart.length;
  const cartCountElement = document.querySelector('.cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
}

updateCartCount();

function addItemToCart(item) {
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function removeItemFromCart(item) {
  const index = cart.indexOf(item);
  if (index !== -1) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }
}