const baseUrl = "http://localhost:5007/products";

document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("productList");
  const addBtn = document.getElementById("addBtn");

  // 🟢 Load products
  function LoadProducts() {
    fetch(baseUrl)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched data:", data);
        list.innerHTML = "";
        data.forEach(product => {
          console.log("Product:", product);

          const li = document.createElement("li");
          li.textContent = `${product.productName} - R${product.price}`;

          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "Delete";
          deleteBtn.addEventListener("click", () => {
            fetch(`${baseUrl}/${product.id}`, { method: "DELETE" })
              .then(() => {
                console.log("Deleted product", product.id);
                LoadProducts();
              })
              .catch(error => console.error("Error deleting product:", error));
          });

          li.appendChild(deleteBtn);
          list.appendChild(li);
        });
      })
      .catch(err => console.error("Error fetching:", err));
  }

  // 🟢 Add new product
  addBtn.addEventListener("click", () => {
    const name = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value.trim();

    if (!name || !price) {
      alert("Please enter both product name and price.");
      return;
    }

    const newProduct = { productName: name, price: parseFloat(price) };

    fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct)
    })
      .then(res => res.json())
      .then(() => {
        console.log("Added product:", newProduct);
        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";
        LoadProducts();
      })
      .catch(err => console.error("Error adding product:", err));
  });

  LoadProducts();
});

// document.addEventListener("DOMContentLoaded", function() {
//     const productList = document.querySelector("ul");
//     const addBtn = document.getElementById("addProduct");

//     function LoadProducts() {
//         fetch("http://localhost:5007/products")
//             .then(response => response.json())
//             .then(data => {
//                 console.log("Fetched data:", data); // 👈 Add this line
//                 productList.innerHTML = "";

//                 data.forEach(product => {
//                     console.log("Product:", product);
//                     const li = document.createElement("li");
//                     li.textContent = `${product.productName} - R${product.price}`;

//                     // Delete button
//                     const deleteBtn = document.createElement("button");
//                     deleteBtn.textContent = "Delete";
//                     deleteBtn.addEventListener("click", () => {
//                         fetch(`http://localhost:5007/products/${product.id}`, {
//                             method: "DELETE"
//                         })
//                         .then(() => {
//                             console.log(`Deleted product ${product.id}`);
//                             LoadProducts();
//                         })
//                         .catch(error => console.error("Error deleting product:", error));
//                     });

//                     // Edit button
//                     const editBtn = document.createElement("button");
//                     editBtn.textContent = "Edit";
//                     editBtn.addEventListener("click", () => {
//                         const updatedProduct = {
//                             ProductName: prompt("Edit product name", product.ProductName),
//                             Price: parseFloat(prompt("Edit price", product.Price))
//                         };

//                         fetch(`http://localhost:5007/products/${product.Id}`, {
//                             method: "PUT",
//                             headers: { "Content-Type": "application/json" },
//                             body: JSON.stringify(updatedProduct)
//                         })
//                         .then(res => res.json())
//                         .then(() => LoadProducts())
//                         .catch(error => console.error("Error updating product:", error));
//                     });

//                     li.appendChild(deleteBtn);
//                     li.appendChild(editBtn);
//                     productList.appendChild(li);
//                 });
//             })
//             .catch(error => console.error("Cannot load products:", error));
//     }

//     // Add new product
//     if (addBtn) {
//         addBtn.addEventListener("click", () => {
//             const newProduct = {
//                 ProductName: prompt("Enter product name"),
//                 Price: parseFloat(prompt("Enter product price"))
//             };

//             fetch("http://localhost:5007/products", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(newProduct)
//             })
//             .then(res => res.json())
//             .then(() => LoadProducts())
//             .catch(error => console.error("Error adding product:", error));
//         });
//     }

//     LoadProducts();
// });

