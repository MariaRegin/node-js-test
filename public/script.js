const divElement = document.getElementById("products");

//запрос на все продукты
async function getProducts() {
  const response = await fetch("/api/products", {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  if (response.ok) {
    const products = await response.json();
    divElement.innerHTML = "";
    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.setAttribute("data-id", product.id);
      productElement.innerHTML = `<p>Id: ${product.id}</p><p>Название: ${product.name}</p><p>Количество: ${product.quantity}</p><button onclick='deleteProduct(${product.id})'>Удалить</button>`;
      divElement.appendChild(productElement);
    });
  }
}

//добавление продукта
async function createProduct(productName, productQuantity) {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      name: productName,
      quantity: productQuantity,
    }),
  });
  if (response.ok) {
    reset();
    getProducts();
  }
}

//удаление продукта
async function deleteProduct(id) {
  const response = await fetch(`/api/products/${id}`, {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (response.ok) {
    const productElement = document.querySelector(`[data-id='${id}']`);
    if (productElement) {
      productElement.remove();
    }
  }
}

function reset() {
  const form = document.forms["productsForm"];
  form.reset();
  form.elements["id"].value = 0;
}

document.getElementById("resetBtn").addEventListener("click", (e) => {
  e.preventDefault();
  reset();
});

document.forms["productsForm"].addEventListener("submit", (e) => {
  e.preventDefault();
  const form = document.forms["productsForm"];
  const id = form.elements["id"].value;
  const name = form.elements["name"].value;
  const quantity = form.elements["quantity"].value;
  if (id == 0) createProduct(name, quantity);
});

document.addEventListener("DOMContentLoaded", getProducts);
