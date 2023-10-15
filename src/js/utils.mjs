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
}