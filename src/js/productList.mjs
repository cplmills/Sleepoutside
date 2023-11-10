import { getProductsByCategory } from "./externalServices.mjs";
import { renderListWithTemplate, listSort, sortProduct } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimarySmall}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p></a
    >
    <button class="quick-view-button" data-product-id="${product.Id}">Quick View</button>
    
  </li>`;
}


export default async function productList(selector, category) { 
    const element = document.querySelector(selector);
    const newTitle = document.getElementById("topProducts");
    newTitle.innerText = "Top Products: "+category.charAt(0).toUpperCase() + category.slice(1);
    const Allproducts = await getProductsByCategory(category);
    renderListWithTemplate(productCardTemplate, selector, Allproducts, "afterbegin", false);
    attachQuickViewEventListeners(Allproducts);
    
      
  };
    

function openQuickView(product) {
  // Assuming there is a modal in the HTML with the id 'quick-view-modal'
  const modal = document.getElementById('quick-view-modal');
  console.log(modal.querySelector('.product_name'));
  modal.querySelector('.product_name').textContent = product.NameWithoutBrand;
  modal.querySelector('.product_brand').textContent = product.Brand.Name;
  // Add other details like product.Color, product.Description, etc.
  modal.style.display = 'block';
}
function closeQuickView() {
  const modal = document.getElementById('quick-view-modal');
  modal.style.display = 'none';
}

// Close the modal when clicking outside the modal content
window.addEventListener("click", (event) => {
  const modal = document.getElementById('quick-view-modal');
  if (event.target === modal) {
      modal.style.display = "none"; // Hide the modal
  }
});
// Close the modal using the close button
document.addEventListener("DOMContentLoaded", () => {
  const closeModalButton = document.querySelector(".close-modal-button");
  closeModalButton.addEventListener("click", closeQuickView);
});
function attachQuickViewEventListeners(Allproducts) {
  const quickViewButtons = document.querySelectorAll(".quick-view-button");
  quickViewButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        // console.log('quick view btn');
          const productId = btn.getAttribute('data-product-id');
          // console.log(productId);
          const product = Allproducts.find(p => p.Id === productId);
          // console.log(product);
          if (product) {
              openQuickView(product);
          }
      });
  });
}

       
sortProduct(productCardTemplate, selector, Allproducts, "afterbegin", false);


export function createBreadcrumbs(breadcrumbsArray) {
  // Get a reference to the breadcrumb container element
  const breadcrumbContainer = document.getElementById('breadcrumbs');
  // Clear the container
  breadcrumbContainer.innerHTML = '';
  breadcrumbContainer.classList.add("divider");
  // Iterate through the breadcrumb array and create breadcrumb elements
  breadcrumbsArray.forEach((breadcrumb, index) => {
    const name = breadcrumb[0];
    const link = breadcrumb[1];
    console.log("this: " + name + ": " + link);
    // Create a list item element
    const listItem = document.createElement('li');

    // Create a link element and capatalize the first letter of the name
    // if the link is the current page (denoted by a `#` for the link element) set the style to activeBreadcrumb
    const anchor = document.createElement('a');
    anchor.textContent = breadcrumb[0].charAt(0).toUpperCase() + name.slice(1);
    anchor.href = link;
    if (link === "#") {
      anchor.id = "activeBreadcrumb";
    }

    // Append the link to the list item
    listItem.appendChild(anchor);

    // Append the list item to the breadcrumb container
    breadcrumbContainer.appendChild(listItem);
  });
//  sortProduct(productCardTemplate, selector, Allproducts, "afterbegin", false);
}
