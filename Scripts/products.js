// Functionality
function CreateItem(id, name, category, image, description, price, currency) {
  this.id = id
  this.name = name
  this.category = category
  this.image = image
  this.description = description
  this.price = price
  this.currency = currency
}

let item1 = new CreateItem(1, "Lego Bonsai tree", "Nature", "https://zenlee-george.github.io/hostedimages/Lego Bonsai tree.jpg", "The Lego Bonsai Tree is a intricately designed, miniature tree made from Lego bricks carefully crafted to resemble a real bonsai tree.", 999, "ZAR")
let item2 = new CreateItem(2, "Lego Flower", "Nature", "https://zenlee-george.github.io/hostedimages/Lego Flower.jpg", "The Lego Flower is a delicate, colorful flower made from Lego bricks, adding a touch of creativity to any space. It's a beautiful and unique decorative piece that would brighten up any room!", 849, "ZAR")
let item3 = new CreateItem(3, "Lego Mandrake", "Nature", "https://zenlee-george.github.io/hostedimages/LegoMandrake.jpg", "The Lego Parrot is a vibrant, colorful parrot made from Lego bricks, adding a touch of tropical flair to any space. It's a beautiful and unique decorative piece that would brighten up any room!", 1199, "ZAR")
let item4 = new CreateItem(4, 'Lego Batmobile', 'Batman', "https://zenlee-george.github.io/hostedimages/Lego Batmobile.jpg", "The Lego Batmobile is an intricately designed, miniature replica of the Caped Crusader's trusty vehicle, carefully crafted from Lego bricks to resemble the real deal. It's a perfect blend of Batman's vigilante spirit and Lego's creative genius, making it a must-have decorative piece for any Batman fan's room or office!", 4499, "ZAR")
let item5 = new CreateItem(5, "Lego Batman", "Batman", "https://zenlee-george.github.io/hostedimages/Lego Batman.jpg", "The Lego Batman is a miniature, heroic figure of the Caped Crusader, carefully crafted from Lego bricks to capture the essence of Batman's bravery and determination. It's a perfect addition to any Batman fan's collection, and a great way to show off their love for the Dark Knight!", 669, "ZAR")
let item6 = new CreateItem(6, "Lego DC comics super heros batman", "Batman", "https://zenlee-george.github.io/hostedimages/Lego DC comics super heros batman.jpg", "The Lego DC Comics Super Heroes Batman is a miniature, heroic figure of the Caped Crusader, inspired by the iconic Batman: The Animated Series, carefully crafted from Lego bricks to capture the essence of Batman's bravery and determination in defending Gotham City. It's a perfect addition to any Batman fan's collection, and a great way to show off their love for the Dark Knight!",  5699, "ZAR")
let item7 = new CreateItem(7, "Lego Cat", "Animal", "https://zenlee-george.github.io/hostedimages/Lego Cat.jpg", "The Lego Cat is a delightful, colorful cat made from Lego bricks, adding a touch of whimsy to any space. It's a beautiful and unique decorative piece that would brighten up any room!", 1899, "ZAR")
let item8 = new CreateItem(8, "Lego Parrot", "Animal", "https://zenlee-george.github.io/hostedimages/Lego Parrot.jpg", "The Lego Parrot is a vibrant, colorful parrot made from Lego bricks, adding a touch of tropical flair to any space. It's a beautiful and unique decorative piece that would brighten up any room!", 449, "ZAR")
let item9 = new CreateItem(9, "Lego Simba", "Animal", "https://zenlee-george.github.io/hostedimages/LegoSimba.jpg", "The Lego Parrot is a vibrant, colorful parrot made from Lego bricks, adding a touch of tropical flair to any space. It's a beautiful and unique decorative piece that would brighten up any room!", 2499, "ZAR")

let items = [item1, item2, item5, item4, item8, item6, item3, item7, item9]

localStorage.setItem('items', JSON.stringify(items))

let main = document.querySelector('main')
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []

items.forEach(item => {
  const itemDiv = document.createElement('div');
   itemDiv.className = 'product ' + item.category;
  itemDiv.innerHTML = `
    <img src="${item.image}">
    <div class="product-info">
      <h2 class="product-name">${item.name}</h2>
      <p class="product-price">R ${item.price}</p>
      <div class="product-description" style="display: none;">${item.description}</div>
      <button class="button view-more-button" id="view-more">View More</button>
      <button class="button add-to-cart" value="${item.id}">Add to Cart</button>
      <span class="cart-quantity">(0)</span>
    </div>
  `;
  main.appendChild(itemDiv);

  const viewMoreButton = itemDiv.querySelector('.view-more-button');
  const productDescription = itemDiv.querySelector('.product-description');
  viewMoreButton.addEventListener('click', event => {
    productDescription.style.display = productDescription.style.display === 'none'? 'block' : 'none';
  });

  const addToCartButton = itemDiv.querySelector('.add-to-cart');
  const cartQuantitySpan = itemDiv.querySelector('.cart-quantity');

  addToCartButton.addEventListener('click', () => {
    let existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({...item, quantity: 1 });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    cartQuantitySpan.textContent = `(${existingItem? existingItem.quantity : 1})`;
  });
});

let products = JSON.parse(localStorage.getItem('items'));

let filteredProducts = products;

const sortBtns = document.querySelectorAll('.sort-btn');
const categoryFilters = document.querySelectorAll('.category-filter');

sortBtns.forEach(function(btn) {
  btn.addEventListener("click", function() {
    const sortType = btn.id;
    switch (sortType) {
      case "min-max":
        filteredProducts.sort(function(a, b) {
          return a.price - b.price;
        });
        break;
      case "max-min":
        filteredProducts.sort(function(a, b) {
          return b.price - a.price;
        });
        break;
      case "alphabetical":
        filteredProducts.sort(function(a, b) {
          return a.name.localeCompare(b.name);
        });
        break;
    }
    displayProducts(filteredProducts);
  });
});

categoryFilters.forEach(function(filter) {
  filter.addEventListener("click", function() {
    const category = filter.id;
    filteredProducts = products.filter(function(product) {
      return product.category === category;
    });
    displayProducts(filteredProducts);
  });
});

document.getElementById('all-categories').addEventListener('click', function() {
  filteredProducts = products;
  displayProducts(filteredProducts);
});

function displayProducts(products) {
  main.innerHTML = '';
  products.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'product ' + item.category;
    itemDiv.innerHTML = `
      <img src="${item.image}">
      <div class="product-info">
        <h2 class="product-name">${item.name}</h2>
        <p class="product-price">R ${item.price}</p>
        <div class="product-description" style="display: none;">${item.description}</div>
        <button class="button view-more-button" id="view-more">View More</button>
        <button class="button add-to-cart" value="${item.id}">Add to Cart</button>
        <span class="cart-quantity">(0)</span>
      </div>
    `;
    main.appendChild(itemDiv);

    const viewMoreButton = itemDiv.querySelector('.view-more-button');
    const productDescription = itemDiv.querySelector('.product-description');
    viewMoreButton.addEventListener('click', event => {
      productDescription.style.display = productDescription.style.display === 'none'? 'block' : 'none';
    });

    const addToCartButton = itemDiv.querySelector('.add-to-cart');
    const cartQuantitySpan = itemDiv.querySelector('.cart-quantity');

    addToCartButton.addEventListener('click', () => {
      let existingItem = cartItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push({...item, quantity: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      cartQuantitySpan.textContent = `(${existingItem? existingItem.quantity : 1})`;
    });
  });
}