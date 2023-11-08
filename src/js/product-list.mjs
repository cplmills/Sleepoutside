import productList from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import { createBreadcrumbs } from "./productList.mjs";

if (sessionStorage.getItem('userSearch') === 'true'){
    productList(".product-list", getParam("search"));
    createBreadcrumbs([["Home", "../index.html"],[getParam("search"), `#`]]);
} else {
    productList(".product-list", getParam("product"));
    createBreadcrumbs([["Home", "../index.html"],[getParam("product"), `#`]]);
}

loadHeaderFooter();



