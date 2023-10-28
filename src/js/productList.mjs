import { getData } from "./productData.mjs";
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
  </li>`;
}

export default async function productList(selector, category) { 
    const element = document.querySelector(selector);
    const newTitle = document.getElementById("topProducts");
    newTitle.innerText = "Top Products: "+category.charAt(0).toUpperCase() + category.slice(1);
    const Allproducts = await getData(category);
    renderListWithTemplate(productCardTemplate, selector, Allproducts, "afterbegin", false);    
}

export function createBreadcrumbs(breadcrumbsArray) {
  // Get a reference to the breadcrumb container element
  const breadcrumbContainer = document.getElementById('breadcrumbs');

  // Clear the container
  breadcrumbContainer.innerHTML = '';
  breadcrumbContainer.classList.add("divider");
  // Iterate through the breadcrumb array and create breadcrumb elements
  breadcrumbsArray.forEach((breadcrumb, index) => {
    const [name, link] = breadcrumb;

    // Create a list item element
    const listItem = document.createElement('li');

    // Create a link element and capatalize the first letter of the name
    // if the link is the current page (denoted by a `#` for the link element) set the style to activeBreadcrumb
    const anchor = document.createElement('a');
    anchor.textContent = name.charAt(0).toUpperCase() + name.slice(1);
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