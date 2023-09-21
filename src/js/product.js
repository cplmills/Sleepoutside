import { setLocalStorage } from "/js/utils.mjs";
import { findProductById } from "/js/productData.mjs";

function addProductToCart(product) {
  if (product) {
    setLocalStorage("so-cart", product);
  }
  
}
// add to cart button event handler
async function addToCartHandler(e) {
  if (e.target && e.target.dataset && e.target.dataset.id) {
    const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
  }
  
}

// add listener to Add to Cart button
const addToCartButton = document.getElementById("addToCart");
if (addToCartButton){
  addToCartButton.addEventListener("click", addToCartHandler);
}

