import { getOrders } from "./externalServices.mjs";

export default async function currentOrders(DOMSelector, token) {
  try {
    const orders = await getOrders(token);
    const tagName = document.querySelector(DOMSelector);

    let newTable = document.createElement("table");
    newTable.className = "orderTable";
    let tableHeader = document.createElement("tr");
    let tableHeaderText = "<th>Order #</th><th>Date</th><th>Qty</th><th>Total $</th>";
    tableHeader.innerHTML = tableHeaderText
    newTable.appendChild(tableHeader);
    
    orders.map((nextValue) => {
        let numericOrderTotal = parseFloat(nextValue.orderTotal);
        let newOrderItemTR = document.createElement("tr");
        newOrderItemTR.className = "itemTR";
        newOrderItemTR.innerHTML = `
        <td>${nextValue.id}</td>
        <td>${new Date(nextValue.orderDate).toLocaleDateString("en-US")}</td>
        <td>${nextValue.items.length}</td>
        <td>${numericOrderTotal.toFixed(2)}</td>`;
        newTable.appendChild(newOrderItemTR);
    });
    tagName.appendChild(newTable);
} catch (err) {
    console.log(err.message);
  }
}
