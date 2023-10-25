import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { createBreadcrumbs } from "./productList.mjs";
import { findCategoryById } from "./productData.mjs";

const productId = getParam("product");
productDetails(productId);
let thisCategory = await findCategoryById(getParam("product", "Category"));
createBreadcrumbs([["Home", "../index.html"],[thisCategory, `../product-list/index.html?product=${thisCategory}`],[productId, "#"] ]);
