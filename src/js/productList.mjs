import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";
import { listSort } from "./utils.mjs"

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="Image of ${product.Name}"
        onerror="this.onerror=null;this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019';"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p></a
    >
  </li>`;
}

function discountIndicator(product) {
  const productCard = document.querySelectorAll('.product-card');
  const suggestedRetailPriceList = product.map((item) => { 
    return item.SuggestedRetailPrice});
  const ListPriceList = product.map((item) => {
    return item.ListPrice
  })

  const discountList = [];
  for (let i = 0; i < product.length; i++) {
      let discountPrice = ( ( ( suggestedRetailPriceList[i] - ListPriceList[i] ) / suggestedRetailPriceList[i] )  * 100 );
      discountList.push(discountPrice.toFixed(0));
  }
  productCard.forEach(function(card,index) {
    let discountTemplate = `<p class="discount-indicator">${discountList[index]}% OFF!</p>`
    card.insertAdjacentHTML("afterbegin", discountTemplate);
  })
  
}

export default async function productList(selector, category) {
    const Allproducts = await getData(category);
    console.log(Allproducts);
    renderListWithTemplate(productCardTemplate, selector, Allproducts, "afterbegin", false);
    sorter(selector, Allproducts);
    discountIndicator(Allproducts);
}

function sorter(selector, list){
  document.querySelector('#sort-list').addEventListener("change", () => {
    let tempList = listSort(list);
    let previousCardList = document.querySelectorAll('.product-card')
    previousCardList.forEach(item => item.remove());
    renderListWithTemplate(productCardTemplate, selector, tempList, "afterbegin", false);
    discountIndicator(tempList);
  })
}

