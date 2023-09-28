import { doc } from "prettier";
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

function showTotalContents(items) {
  if (items.length != 0) {
    document.querySelector(".cart-footer.hide").style.display = "unset";

    const itemPricesList = items.map((item) => item.ListPrice);

    const priceTotal = itemPricesList.reduce(
      (item, currentTotal) => item + currentTotal,
      0
    );

    document
      .querySelector(".cart-total")
      .insertAdjacentHTML("beforeend", `$${priceTotal}`);
  }
}

function checkCartItems() {
  const cartItems = getLocalStorage("so-cart");
  showTotalContents(cartItems);
}

renderCartContents();
checkCartItems();
