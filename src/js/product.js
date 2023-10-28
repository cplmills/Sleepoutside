// import { setLocalStorage } from "./utils.mjs";
// import { getLocalStorage } from "./utils.mjs";
import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");
productDetails(productId);

<<<<<<< HEAD
async function init(productId) {
  await productDetails(productId);
}
// const data = await findProductById(productId);
// console.log(data);

function addProductToCart(product) {
  const cartData = getLocalStorage("so-cart") || [];
  cartData.push(product);
  setLocalStorage("so-cart", cartData);
}
=======
// function addProductToCart(product) {
//   const cartData = getLocalStorage("so-cart") || [];
//   cartData.push(product);
//   setLocalStorage("so-cart", cartData);
// }

>>>>>>> 7b20208fd83d71170e7b54482c6deb098037053c
// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }
