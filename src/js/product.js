import { setLocalStorage } from "./utils.mjs";
import { findProductById, getData } from "./productData.mjs";
import { getLocalStorage } from "./utils.mjs";
import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");
// await productDetails(productId);
init(productId);

async function init(productId){
  await productDetails(productId)
}

function addProductToCart(product) {
  const cartData = getLocalStorage("so-cart") || [];
  cartData.push(product);
  setLocalStorage("so-cart", cartData);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}