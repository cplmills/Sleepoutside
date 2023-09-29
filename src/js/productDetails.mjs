import { findProductById } from "./productData.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default async function productDetails(productId) {
    const myProductDetails = await findProductById(productId);
    renderProductDetails(myProductDetails);

    // add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

}

async function addToCartHandler(e) {
    console.log(e);
    const product = await findProductById(e.target.dataset.id);
    console.log(product);
    addProductToCart(product);
}

function addProductToCart(product) {
    const cartData = getLocalStorage("so-cart") || [];
    cartData.push(product);
    setLocalStorage("so-cart", cartData);
}

function renderProductDetails(myProductDetails){
    let newTitle = document.querySelector("title");
    newTitle.innerText = myProductDetails.NameWithoutBrand;

    let newSection = document.createElement("section");
    newSection.className = "product-detail";
    
    let newH3 = document.createElement("h3");
    newH3.innerHTML = myProductDetails.Brand.Name;
    
    let newH2 = document.createElement("h2");
    newH2.className = "divider";
    newH2.innerHTML = myProductDetails.NameWithoutBrand;

    let newImg = document.createElement("img");
    newImg.className = "divider";
    newImg.src = myProductDetails.Image;
    newImg.setAttribute("alt", productDetails.NameWithoutBrand);
    
    let newPrice = document.createElement("p");
    newPrice.className = "product-card__price";
    newPrice.innerHTML = myProductDetails.ListPrice;

    let newColor = document.createElement("p");
    newColor.className = "product__color";
    newColor.innerHTML = myProductDetails.Colors[0].ColorName;

    let newDescription = document.createElement("p");
    newDescription.className = "product__description";
    newDescription.innerHTML = myProductDetails.DescriptionHtmlSimple;

    let newDiv = document.createElement("div");
    newDiv.className = "product-detail__add";
    
    let newButton = document.createElement("button");
    newButton.id = "addToCart";
    newButton.setAttribute("data-id", myProductDetails.Id);
    newButton.innerText = "Add To Cart";
    
    newSection.append(newH3);
    newSection.append(newH2);
    newSection.append(newImg);
    newSection.append(newPrice);
    newSection.append(newColor);
    newSection.append(newDescription);
    
    newDiv.append(newButton);
    newSection.append(newDiv);
    
    let mainTag = document.getElementsByTagName("main")[0];
    mainTag.appendChild(newSection);
    
}