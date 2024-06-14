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

// Functionality
let products = JSON.parse(localStorage.getItem('products')) || [];

let sortedProducts = document.getElementById('adminSortProduct');
let tableContent = document.querySelector('#table-products');


function adminContent(args) {
    try {
        tableContent.innerHTML = "";
        if (args && args.length > 0) {
            args.forEach((product, i) => {
                tableContent.innerHTML += `
                <tr>
                    <td><img src="${product.img_url}" alt="${product.id}" class="img-thumbnail h-50 w-50"></td>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>${product.color}</td>
                    <td>${product.description}</td>
                    <td>R ${product.price}</td>
                    <td>
                    <div class="">
                        <button class="btn btn-outline-success ms-2 mb-2" data-bs-toggle="modal" data-bs-target="#updateProduct${product.id}"><span class="text-light">Update</span></button>
                        <button class="btn btn-outline-success ms-2" onclick="deleteProduct(${i})"><span class="text-light">Delete</span></button>
                        <div class="modal fade" id="updateProduct${product.id}" tabindex="-1" aria-labelledby="updateProduct${product.id}" aria-hidden="true">
                            <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                              <h1 class="modal-title fs-5" id="updateProduct${product.id}">Update Product</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <form>
                              <div class="container">
                              <input class="form-control m-2" type="text" placeholder="Enter item id" value="${product.id}" name="admin-id" id="admin-id${product.id}" required>
                              <input class="form-control m-2" type="text" placeholder="Enter item name" value="${product.name}" name="admin-name" id="admin-name${product.id}" required>
                              <input class="form-control m-2" type="text" placeholder="Enter item category" value="${product.category}" name="admin-category" id="admin-category${product.id}" required>
                              <input class="form-control m-2" type="text" placeholder="Enter item color" value="${product.color}" name="admin-color" id="admin-color${product.id}" required>
                              <textarea class="form-control m-2" placeholder="Enter item description" required name="admin-description" id="admin-description${product.id}">${product.description}</textarea>
                              <input class="form-control m-2" type="number" placeholder="Enter item price" value="${product.price}" name="admin-price" id="admin-price${product.id}" required>
                              <input class="form-control m-2" type="url" placeholder="Enter image URL" value="${product.img_url}" name="admin-img_url" id="admin-img_url${product.id}" required>
                              </div>
                              </form>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal"><span class="text-light">Close</span></button>
                              <button type="button" class="btn btn-outline-success" onclick='new UpdateProduct(${JSON.stringify(product)}, ${i})'><span class="text-light">Save changes</span></button>
                            </div>
                          </div>
                            </div>
                        </div>
                    </div>
                    </td>
                </tr>
                `;
            });
        } else {
            tableContent.innerHTML = `
            <div class="d-flex justify-content-center align-items-center">
                <div class="spinner-border" role="status"></div>
                <p>No Products Found</p>
            </div>
            `;
        }
    } catch (e) {
        tableContent.innerHTML = `
        <div class="d-flex justify-content-center align-items-center">
            <div class="spinner-border" role="status"></div>
            <p>No Products Found</p>
        </div>
        `;
    }
}


adminContent(products);

function UpdateProduct(item, index) {
    try {
        const updatedProduct = {
            id: item.id,
            name: document.querySelector(`#admin-name${item.id}`).value,
            category: document.querySelector(`#admin-category${item.id}`).value,
            color: document.querySelector(`#admin-color${item.id}`).value,
            description: document.querySelector(`#admin-description${item.id}`).value,
            price: parseInt(document.querySelector(`#admin-price${item.id}`).value, 10),
            img_url: document.querySelector(`#admin-img_url${item.id}`).value
        };

        products[index] = updatedProduct;
        localStorage.setItem('products', JSON.stringify(products));
        adminContent(products);
    } catch (e) {
        alert('Unable to Edit the Products');
    }
}

function deleteProduct(index) {
    try {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        adminContent(products);
    } catch (e) {
        alert('Unable to Delete');
    }
}

let highest = false;
sortedProducts.addEventListener('click', () => {
    try {
        if (!highest) {
            products.sort((a, b) => b.id - a.id);
            highest = true;
        } else {
            products.sort((a, b) => a.id - b.id);
            highest = false;
        }
        adminContent(products);
    } catch (e) {
        alert('This Function is under maintenance');
    }
});

function Product(id, name, category, color, description, price, img_url) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.description = description;
    this.price = price;
    this.img_url = img_url;
}

let adminSavedProduct = document.getElementById('saveProduct');
adminSavedProduct.addEventListener('click', () => {
    try {
        const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;

        const newProduct = new Product(
            newId,
            document.querySelector('#addName').value,
            document.querySelector('#addCategory').value,
            document.querySelector('#addDescription').value,
            parseInt(document.querySelector('#addPrice').value, 10),
            document.querySelector('#addImage').value
        );

        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        adminContent(products);

        location.reload()
    } catch (e) {
        alert('Unable to Add new product');
    }
});