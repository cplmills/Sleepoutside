import { alertMessage, loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

checkoutProcess.init("so-cart", ".checkout-summary");

document
  .querySelector("#zip")
  .addEventListener(
    "blur",
    checkoutProcess.calculateOrdertotal.bind(checkoutProcess)
  );

// this is how it would look if we listen for the submit on the form
document.forms["checkout"].addEventListener("submit", function (event) {
  const checkoutForm = document.forms.checkout; // Form
  const alerts = document.querySelectorAll(".alert"); // Alert
  alerts.forEach((alert) => alert.remove());

  event.preventDefault();

  checkoutForm.reportValidity();

  if (!checkoutForm.checkValidity()) {
    const allFormInput = document.querySelectorAll("input");
    allFormInput.forEach((input) => {
      if (!input.checkValidity()) {
        let name = input.id;
        let inputName;
        switch (name) {
          case "fname":
            inputName = "First Name";
            break;
          case "lname":
            inputName = "Last Name";
            break;
          case "street":
            inputName = "Street Address";
            break;
          case "city":
            inputName = "City";
            break;
          case "state":
            inputName = "State";
            break;
          case "zip":
            inputName = "Zip Code";
            break;
          case "cardNumber":
            inputName = "Card Number";
            break;
          case "expiration":
            inputName = "Expiration Date";
            break;
          case "code":
            inputName = "Security Code";
            break;
        }
        let customMessage = `Invalid ${inputName}`;
        alertMessage(customMessage);
      }
    });
  } else {
    checkoutProcess.checkout(event.target);
  }
  // e.target would contain our form in this case
});
