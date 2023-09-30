import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <span class="remove-button" data-id="${item.id}">&#10006;</span>
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
function attachRemoveListener(cartItem, productId) {
  const removeButton = cartItem.querySelector(".remove-button");
  removeButton.addEventListener("click", () => {
    // Retrieve the cart from local storage
    const cartItems = getLocalStorage("so-cart");

    // Find the index of the item to be removed based on its productId
    const indexToRemove = cartItems.findIndex((item) => item.id === productId);

    if (indexToRemove !== -1) {
      // Remove the item from the cart
      cartItems.splice(indexToRemove, 1);

      // Update the cart in local storage
      setLocalStorage("so-cart", cartItems);

      // Re-render the cart list
      renderCartContents();
    }
  });
}
renderCartContents();





  

