import { doc } from "prettier";
import { getLocalStorage , setLocalStorage} from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (localStorage.getItem("so-cart") === null){  // if there are no items in the cart
    const emptyCartMessage = document.createElement("h3");
    emptyCartMessage.innerHTML = "You Have No Items In Your Cart";
    document.getElementsByTagName("main")[0].appendChild(emptyCartMessage);
  }else{
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      removeCartItem(index);
    });
  });
    // document.querySelector(".remove-button").addEventListener('click', removeCartItem)
  }
}

function cartItemTemplate(item, index) {
  //calculate the discount based on the item price
  let discountPercentage = 0;
  if (item.ListPrice > 300) {
    discountPercentage = 0.05;
  } else if (item.ListPrice >150) {
    discountPercentage = 0.03;
  }
  const discountPrice = item.ListPrice * discountPercentage;
  const discountedPrice = item.ListPrice-discountPrice;
  item.discountedPrice = discountedPrice;
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
  }
}

function showTotalContents(items) {
  items.forEach((item)=> {
    let discountPercentage = 0;
    if (item.ListPrice > 300) {
    discountPercentage = 0.05;
  } else if (item.ListPrice >150) {
    discountPercentage = 0.03;
  }
  const discountPrice = item.ListPrice * discountPercentage;
  const discountedPrice = item.ListPrice-discountPrice;
  item.discountedPrice = discountedPrice;
  })  
  console.log(items);
  if (items.length != 0) {
    document.querySelector(".cart-footer.hide").style.display = "unset";

    const itemPricesList = items.map((item) => item.discountedPrice);

    const priceTotal = itemPricesList.reduce(
      (item, currentTotal) => item + currentTotal,
      0
    );

    document
      .querySelector(".cart-total")
      .insertAdjacentHTML("beforeend", `$${priceTotal.toFixed(2)}`);
  }
}

function checkCartItems() {
  const cartItems = getLocalStorage("so-cart");
  console.log(cartItems);
  if (cartItems != null){
    showTotalContents(cartItems);
  }
  
}

renderCartContents();
checkCartItems();
