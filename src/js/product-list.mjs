import productList from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import { createBreadcrumbs } from "./productList.mjs";

productList(".product-list", getParam("product"));
createBreadcrumbs([["Home", "../index.html"],[getParam("product"), `#`]]);

loadHeaderFooter();




