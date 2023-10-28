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
    // Initialize an array to store item totals.
    const itemTotals = [];

    // Loop through all items in localStorage.
    for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            // Parse the JSON data from localStorage.
            const item = JSON.parse(localStorage.getItem(key));

            // Check if the item has an "item_total" field.
            if (item && item.FinalPrice) {
                itemTotals.push(item.FinalPrice);
            }
        }
    }

    // Summarize the item totals.
    const totalItemTotal = itemTotals.reduce((total, itemTotal) => total + itemTotal, 0);
    this.orderTotal = totalItemTotal;
    console.log("Sum of 'item_total' from localStorage: " + totalItemTotal);
    
  },



  calculateOrdertotal: function() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    let itemCount = 0;

    // Loop through all items in localStorage and count them.
    for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            itemCount++;
        }
    }

    this.shipping = 10 + (Math.max(itemCount - 1, 0) * 2);
    this.tax = this.orderTotal * 0.06;

    // display the totals.
    this.displayOrderTotals();
  },




  displayOrderTotals: function() {
    // once the totals are all calculated display them in the order summary page
    let f_subtotal = document.getElementById("subtotal");
    let f_shipping = document.getElementById("shipping");
    let f_tax = document.getElementById("tax");
    let f_orderTotal = document.getElementById("orderTotal");

    f_subtotal.innerHTML = this.orderTotal;
    f_shipping.innerHTML = this.shipping;
    f_tax.innerHTML = this.tax;
    f_orderTotal.innerHTML = this.orderTotal;
  }
  
}
export default checkoutProcess;