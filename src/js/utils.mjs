// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(parameter){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(parameter);
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = true) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const HTMLselector = document.querySelector(parentElement);
  let template = list.map(templateFn);
  HTMLselector.insertAdjacentHTML(position, template.join(""));
}

export function renderWithTemplate(templateFn, parentElement, data, position = "afterbegin", clear = true) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const HTMLselector = document.querySelector(parentElement);
  let template = data;
  HTMLselector.insertAdjacentHTML(position, template.join(""));
  if(callback) {
    callback(data);
  }
}

export function loadTemplate(path) {
    return async function () {
      const res = await fetch(path);
      if (res.ok) {
      const html = await res.text();
      return html;
      }
    } 
} 

export async function loadHeaderFooter(){
  let headerTag = document.getElementById("header");
  let footerTag = document.getElementById("footer");

  const headerTemplateFn = loadTemplate("/partials/header.html")
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  
  headerTag.innerHTML = await headerTemplateFn();
  footerTag.innerHTML = await footerTemplateFn();
  giveawayMessage();
  searchBar();
  showCartCount();
}

export function showCartCount(){
  if (getLocalStorage("so-cart")) {
    let badge = document.querySelector(".cart-item-count");
    badge.innerHTML = getLocalStorage("so-cart").length;
  }
}



export function listSort(list){
  let sortSelector = document.querySelector("#sort-list");
    if (sortSelector.value === "price-ascend") {
      list.sort(compareFunction)
      document.querySelector('#sort-default').style.display = "none";
      } else if (sortSelector.value === "price-descend")
      {
        list.sort(compareFunctionReverse);
        document.querySelector('#sort-default').style.display = "none";
      } else if (sortSelector.value === "brand-alphabetical-ascend")
      {
        list.sort(compareName);
        document.querySelector('#sort-default').style.display = "none";
      } else if (sortSelector.value === "brand-alphabetical-descend")
      {
        list.sort(compareNameReverse);
        document.querySelector('#sort-default').style.display = "none";
    }
  
    function compareFunction(a, b) {
      return a.FinalPrice - b.FinalPrice;
    }
    function compareFunctionReverse(a, b) {
      return b.FinalPrice - a.FinalPrice;
    }
    function compareName(a, b){
      let nameA = a.Brand.Name.toLowerCase();
      let nameB = b.Brand.Name.toLowerCase();

      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      if (nameA === nameB) return 0;
    }
    function compareNameReverse(a, b){
      let nameA = a.Brand.Name.toLowerCase();
      let nameB = b.Brand.Name.toLowerCase();

      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
      if (nameA === nameB) return 0;
    }
  return list;
}
  
  export function sortProduct(templateFn, parentElement, data, position, boolValue) {
    const sortChoices = document.querySelector('#sort-list');
    sortChoices.addEventListener("change", () => {
      const products = document.querySelectorAll('.product-card');
      products.forEach(item => item.remove());
      renderListWithTemplate(templateFn, parentElement, listSort(data), position, boolValue);
    });
  }

  export function newsLetter() {
    let closeBtn = document.querySelector('#close');
    closeBtn.addEventListener('click', () => {
      let newslettercontainer = document.querySelector('.news-letter-container')
      newslettercontainer.style.opacity = "0%";
    })
  }


  export function alertMessage(message, scroll = true) {
    // create element to hold our alert
    const alert = document.createElement('div');
    // add a class to style the alert
    alert.classList.add('alert');
    // set the contents. You should have a message and an X or something the user can click on to remove
    const alertMessage = document.createElement('p');
    alertMessage.textContent = `${message}`;
    alertMessage.classList.add('alertMessage');
    const alertClose = document.createElement('p');
    alertClose.textContent = 'X';
    alertClose.classList.add('alertClose');
    alert.appendChild(alertMessage);
    alert.appendChild(alertClose);
    // add a listener to the alert to see if they clicked on the X
    // if they did then remove the child
    alert.addEventListener('click', function(e) {
        let element = e.target
        if(element.classList.contains('alertClose')) { // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
          main.removeChild(this);
        }
    });
    // add the alert to the top of main
    const main = document.querySelector('main');
    main.prepend(alert);
    // make sure they see the alert by scrolling to the top of the window
    //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
    if(scroll){
      window.scrollTo(0,0);
    }
  
  }

  export function searchBar(){
    const user_search = document.querySelector('#searchBar');
    // const modified_search = totitleCase(user_search.value);
    const searchForm = document.forms.searchForm;
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      sessionStorage.setItem('userSearch', true);
      sessionStorage.setItem('userSearchKey', totitleCase(user_search.value));
      window.location.href = `/product-list/index.html?search=${user_search.value}`;
    });

  }

  export function searchResults(){
    if (sessionStorage.getItem('userSearch') === 'true') {
      const userKeyWord = sessionStorage.getItem('userSearchKey').toString();
      const productCards = document.querySelectorAll('.product-card');
      const sort_list = document.querySelector('#sort-list');
      const sort_label = document.querySelector('#sort-label');
      productCards.forEach(item => {
      
        if (!item.textContent.includes(userKeyWord)) {
          item.remove();
          sessionStorage.clear();
        }
      
      sort_list.style.display = "none";
      sort_label.style.display = "none";
      
      });
  }
}

function totitleCase(str){
  return str.replace(/\b\w/g, function (match) {
    return match.toUpperCase();
  });
}

async function giveawayMessage(){
  const giveawayContainer = document.querySelector('.giveaway-container');
  const visitNumber = localStorage.getItem('visitTrack');
  const giveaway = document.querySelector('.giveaway-container');
  const giveawayTemplateFn = loadTemplate("/partials/giveaway.html");
  if(giveawayContainer) {
    if (!localStorage.getItem('visitTrack')) {  

      giveaway.innerHTML = await giveawayTemplateFn();

      const closeGiveaway = document.querySelector('#giveaway-close');
  
      closeGiveaway.addEventListener('click', () => {
      giveawayContainer.style.opacity = "0%";
      giveawayContainer.style.pointerEvents = "none";
      localStorage.setItem('visitTrack', 1);
  });
    } else {
      localStorage.setItem('visitTrack', (parseFloat(visitNumber) + 1));
      giveawayContainer.style.opacity = "0%";
      giveawayContainer.style.pointerEvents = "none";
    }
  }
}

  

  

  
 


