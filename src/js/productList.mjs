import { getProductsByCategory } from "./externalServices.mjs";
import { renderListWithTemplate, listSort, sortProduct, searchResults } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <picture>
        <source srcset="${product.Images.PrimarySmall}" media="(max-width: 80px)">
        <source srcset="${product.Images.PrimaryMedium}" media="(max-width: 120px)">
        <source srcset="${product.Images.PrimaryLarge}">
        <img src="${product.Images.PrimaryLarge}" alt="${product.NameWithoutBrand}">
      </picture>

      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p></a
    >
  </li>`;
}


export default async function productList(selector, category) { 
    const element = document.querySelector(selector);
    const newTitle = document.getElementById("topProducts");
    if (sessionStorage.getItem('userSearch') === 'true') {
      newTitle.innerText = "Search Product: "+category.charAt(0).toUpperCase() + category.slice(1);
    } else {
      newTitle.innerText = "Top Products: "+category.charAt(0).toUpperCase() + category.slice(1);
    }
    const Allproducts = await getProductsByCategory(category);
    renderListWithTemplate(productCardTemplate, selector, Allproducts, "afterbegin", false);
    sortProduct(productCardTemplate, selector, Allproducts, "afterbegin", false);
    searchResults();
}

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