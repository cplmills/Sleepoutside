import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}
// Add event delegation to handle remove button clicks
document.querySelector(".product-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-button")) {
    const productIdToRemove = e.target.dataset.id;
    removeCartItem(productIdToRemove);
  }
});

function removeCartItem(productId) {
  const cartItems = getLocalStorage("so-cart");
  // Find the index of the item with the matching ID
  const indexToRemove = cartItems.findIndex((item) => item.id === productId);

  if (indexToRemove !== -1) {
    // Remove the item at the specified index
    cartItems.splice(indexToRemove, 1);
  
  
// Update the cart in Local Storage
setLocalStorage("so-cart", cartItems);

// Re-render the cart contents
renderCartContents();
}
}
  

renderCartContents();
