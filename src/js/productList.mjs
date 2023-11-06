import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

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
    const Allproducts = await getData(category);
    console.log(Allproducts);
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

       
