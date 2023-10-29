import { createBreadcrumbs } from "./productList.mjs";
import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");
productDetails(productId);
createBreadcrumbs([["Home", "../index.html"],[productId, `../product-list/index.html?product=${getParam("category")}`]]);

// function addProductToCart(product) {
//   const cartData = getLocalStorage("so-cart") || [];
//   cartData.push(product);
//   setLocalStorage("so-cart", cartData);
// }

// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }
