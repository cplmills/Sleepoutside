import { getLocalStorage } from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}


// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  const simpleItems = items.map((currentitem) => {
    return {
      id: currentitem.Id,
      price: currentitem.FinalPrice,
      name: currentitem.Name,
      // qty is always 1 in our cart
      quantity: 1,
    };
  });
  return simpleItems;
}


const checkoutProcess = {
  key: "",
  outputSelector: "",
  list: [],
  itemTotal: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,
  init: function (key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = getLocalStorage(key);
      this.calculateItemSummary();
  },

  calculateItemSummary: function() {
    // calculate and display the total amount of the items in the cart, and the number of items.
   // Initialize a variable to store the total price
    let totalPrice = 0;

    // get the items from LocalStorage
    const cartItems = JSON.parse(localStorage.getItem("so-cart"));

    // Check if there are items in the cart
    if (cartItems) {
        // Loop through each item in the cart
        for (const item of cartItems) {
            if (item.hasOwnProperty("FinalPrice")) {
                totalPrice += parseFloat(item.FinalPrice);
            }
        }
    }
    this.itemTotal = totalPrice;   
  },

  calculateOrdertotal: function() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    let lsItems = getLocalStorage("so-cart");
    let itemCount = lsItems.length;
    this.shipping = 10 + (Math.max(itemCount - 1, 0) * 2);
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = (parseFloat(this.itemTotal) + parseFloat(this.shipping) + parseFloat(this.tax)).toFixed(2);
    // display the totals.
    this.displayOrderTotals();
  },

  displayOrderTotals: function() {
    // once the totals are all calculated display them in the order summary page
    let f_subtotal = document.getElementById("subtotal");
    let f_shipping = document.getElementById("shipping");
    let f_tax = document.getElementById("tax");
    let f_orderTotal = document.getElementById("orderTotal");

    f_subtotal.setAttribute("value", this.orderTotal);
    f_shipping.setAttribute("value", this.shipping);
    f_tax.setAttribute("value",this.tax);
    f_orderTotal.setAttribute("value",this.orderTotal);
  },

  checkout: async function (form) {
    const json = formDataToJSON(form);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    try {
      const res = await checkout(json);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
}

export default checkoutProcess;


    