import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Attach click event listeners to remove buttons
  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      removeCartItem(index);
    });
  });
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
  <button class="remove-button" data-index="${index}" data-id="${item.id}">&#10006;</button>
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

function removeCartItem(index) {
  // Retrieve the cart from local storage
  const cartItems = getLocalStorage("so-cart");

  // Remove the item from the cart based on the provided index
  if (index >= 0 && index < cartItems.length) {
    cartItems.splice(index, 1);

    // Update the cart in local storage
    setLocalStorage("so-cart", cartItems);

    // Re-render the cart list
    renderCartContents();
  }
}

renderCartContents();
