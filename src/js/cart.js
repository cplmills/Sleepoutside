import { loadHeaderFooter, showCartCount } from "./utils.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (localStorage.getItem("so-cart") === null || cartItems.length === 0) {
    // if there are no items in the cart
    const emptyCartMessage = document.querySelector(".cart-heading");
    emptyCartMessage.innerHTML = "My Cart - You Have No Items In Your Cart";
    // document.getElementsByTagName("main")[0].appendChild(emptyCartMessage);
  } else {
    const htmlItems = cartItems.map((item, index) =>
      cartItemTemplate(item, index)
    );
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    const removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        removeCartItem(index);
      });
    });
    // Update the total price
    showTotalContents(cartItems);
  }
}

function cartItemTemplate(item, index) {
  //calculate the discount based on the item price
  let discountPercentage = 0;
  if (item.ListPrice > 300) {
    discountPercentage = 0.05;
  } else if (item.ListPrice > 150) {
    discountPercentage = 0.03;
  }
  const discountPrice = item.ListPrice * discountPercentage;
  const discountedPrice = item.ListPrice - discountPrice;
  item.discountedPrice = discountedPrice;
  const newItem = `<li class="cart-card divider">
  <button class="remove-button" data-index="${index}" data-id="${
    item.id
  }">&#10006;</button>
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
  <p class="cart-card__quantity">qty: ${item.quantity}</p>
  <p class="cart-card__price">$${discountedPrice.toFixed(2)}</p>
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
    checkCartItems();
    showCartCount();
  }
}

function showTotalContents(items) {
  console.log(window.location.href.indexOf("cart.html"));
  //ensure this only runs on the cart page
  // if (window.location.href.indexOf("cart.html") > 0) {
  if(items.length> 0){
    console.log(items);
    items.forEach((item) => {
      let discountPercentage = 0;
      if (item.ListPrice > 300) {
        discountPercentage = 0.05;
      } else if (item.ListPrice > 150) {
        discountPercentage = 0.03;
      }
      const discountPrice = item.ListPrice * discountPercentage;
      const discountedPrice = item.ListPrice - discountPrice;
      item.discountedPrice = discountedPrice;
    });

    if (items.length !== 0) {
      // console.log(document.querySelector(".cart-footer.hide"));
      // document.querySelector(".cart-footer .hide").style.display = "unset";

      const itemPricesList = items.map((item) => item.discountedPrice*item.quantity);

      const priceTotal = itemPricesList.reduce(
        (item, currentTotal) => item + currentTotal,
        0
      );

      // Clear the old total and insert the updated total
      const totalElement = document.querySelector(".cart-total");
      totalElement.innerHTML = `Total: $${priceTotal.toFixed(2)}`;
    } else {
      // If there are no items, clear the total
      const totalElement = document.querySelector(".cart-total");
      totalElement.innerHTML = "";
    }
  }
}

function checkCartItems() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems != null) {
    showTotalContents(cartItems);
  }
}


renderCartContents();
checkCartItems();
loadHeaderFooter();

function addToCart(item) {
  // Retrieve the current cart from local storage
  const cartItems = getLocalStorage("so-cart") || [];

  // Check if the item is already in the cart
  const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

  if (existingItemIndex !== -1) {
    // If the item is already in the cart, increment its quantity
    cartItems[existingItemIndex].quantity += 1;
  } else {
    // If the item is not in the cart, add it with a quantity of 1
    item.quantity = 1;
    cartItems.push(item);
  }

  // Update the cart in local storage
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
checkCartItems();
loadHeaderFooter();
}

