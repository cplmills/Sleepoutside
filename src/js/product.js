import { setLocalStorage } from "./utils.mjs";
import { findProductById, getData } from "./productData.mjs";
import { getLocalStorage } from "./utils.mjs";
import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

// const dataSource = new ProductData("tents");

const productId = getParam("product");
init(productId);

async function init(productNo) {
  await productDetails(productNo);
}

// function addProductToCart(product) {
//   const cartData = getLocalStorage("so-cart") || [];
//   cartData.push(product);
//   setLocalStorage("so-cart", cartData);
// }

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
