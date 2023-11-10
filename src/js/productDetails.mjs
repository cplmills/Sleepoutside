import { getProductById } from "./externalServices.mjs";
import { getLocalStorage, setLocalStorage, showCartCount } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

export default async function productDetails(productId) {
  try {
    const myProductDetails = await getProductById(productId);
    renderProductDetails(myProductDetails);

  // add listener to Add to Cart button
  document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
  } catch (err) {
    if (err instanceof TypeError) {
      alert('Product not found')
    }
  }
}

async function addToCartHandler(e) {
  const product = await getProductById(e.target.dataset.id);
  addProductToCart(product);
  animateLogo();
}

function addProductToCart(product) {
  const cartData = getLocalStorage("so-cart") || [];
  cartData.push(product);
  setLocalStorage("so-cart", cartData);
  showCartCount();
}

function renderProductDetails(myProductDetails) {
  let newTitle = document.querySelector("title");
  newTitle.innerText = myProductDetails.NameWithoutBrand;

  let newSection = document.createElement("section");
  newSection.className = "product-detail";

  let newH3 = document.createElement("h3");
  newH3.innerHTML = myProductDetails.Brand.Name;

  let newH2 = document.createElement("h2");
  newH2.className = "divider";
  newH2.innerHTML = myProductDetails.NameWithoutBrand;

  let pictureDiv = document.createElement("div");
  let saleBanner = document.createElement("p");
  let newPicture = document.createElement("picture");
  let newSmallSource = document.createElement("source");
  newSmallSource.setAttribute("srcset", myProductDetails.Images.PrimarySmall);
  newSmallSource.setAttribute("media", "(max-width: 80px)");
  saleBanner.setAttribute("class", "sale-overlay");
  pictureDiv.setAttribute("class", "sale-banner-div");
  let newMediumSource = document.createElement("source");
  newMediumSource.setAttribute("srcset", myProductDetails.Images.PrimaryMedium);
  newMediumSource.setAttribute("media", "(max-width: 160px)");

  let newImg = document.createElement("img");
  newImg.className = "divider";
  newImg.src = myProductDetails.Images.PrimaryLarge;
  newImg.setAttribute("alt", myProductDetails.NameWithoutBrand);

  newPicture.appendChild(newSmallSource);
  newPicture.appendChild(newMediumSource);
  newPicture.appendChild(newImg);

  let newPrice = document.createElement("p");
  newPrice.className = "product-card__price";
  newPrice.innerHTML = "RRP $ " + myProductDetails.ListPrice;

  //Calculate and display discount price
  
  let discountPercentage = 0;
  if (myProductDetails.ListPrice > 300) {
    discountPercentage = 0.05;
    saleBanner.innerText = "5% SALE";
  } else if (myProductDetails.ListPrice >150) {
    discountPercentage = 0.03;
    saleBanner.innerText = "3% SALE";

  }
  const discountPrice = myProductDetails.ListPrice * discountPercentage;
  let discountElement = document.createElement("p");
  discountElement.className = "product__discount";
  discountElement.innerHTML = `Save $ ${discountPrice.toFixed(2)}<P>You Pay: $ ${(myProductDetails.ListPrice-discountPrice).toFixed(2)}`;
  // Calculate and display discount percentage

  let discountPercentageElement = document.createElement("p");
  discountPercentageElement.className = "product__discount-percentage";
  discountPercentageElement.innerHTML = `Discount: ${discountPercentage*100}%`;

  let newColor = document.createElement("p");
  newColor.className = "product__color";
  newColor.innerHTML = "Color: " + myProductDetails.Colors[0].ColorName;

  let newDescription = document.createElement("p");
  newDescription.className = "product__description";
  newDescription.innerHTML = myProductDetails.DescriptionHtmlSimple;

  let newDiv = document.createElement("div");
  newDiv.className = "product-detail__add";

  let newButton = document.createElement("button");
  newButton.id = "addToCart";
  newButton.setAttribute("data-id", myProductDetails.Id);
  newButton.innerText = "Add To Cart";
  newButton.addEventListener("click", addToCartHandler);

  pictureDiv.appendChild(saleBanner);
  pictureDiv.appendChild(newPicture);
  
  newSection.append(newH3);
  newSection.append(newH2);
  newSection.append(pictureDiv);
  newSection.append(newPrice);
  if (discountPercentage > 0) {
    newSection.append(discountElement);
    newSection.append(discountPercentageElement);

  }
  newSection.append(newColor);
  newSection.append(newDescription);

  newDiv.append(newButton);
  newSection.append(newDiv);

  let mainTag = document.querySelector("main"); 
  mainTag.appendChild(newSection);
}

function animateLogo() {
  let cartLogo = document.querySelector(".cart-logo");
  cartLogo.setAttribute("class", "logo-spinner");

  let btnAdd = document.querySelector("#addToCart");
  btnAdd.innerHTML = "Item Added to Cart";

  setTimeout(function()
  {
      cartLogo.setAttribute("class", "cart-logo");
      btnAdd.innerHTML = "Add to Cart";

  }, 2000);
}

loadHeaderFooter();

