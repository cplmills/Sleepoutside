import { createBreadcrumbs } from "./productList.mjs";
import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { findCategoryById } from "./externalServices.mjs";

const productId = getParam("product");
productDetails(productId);

findCategoryById(productId).then((result) => {
  let categoryName = result;
  createBreadcrumbs([
    ["Home", "../index.html"],
    [categoryName, `../product-list/index.html?product=${categoryName}`],
    [productId, "#"],
  ]);
});

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
