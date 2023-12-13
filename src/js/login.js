import { getParam, loadHeaderFooter } from "./utils.mjs";
import { login } from "./auth.mjs"

loadHeaderFooter();

const receive = getParam("redirect");

let formtag = document.querySelector("#login-form");
formtag.addEventListener("submit",(e) => {
    e.preventDefault();
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    login({email, password}, receive) ;
})
