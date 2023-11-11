import { getParam, loadHeaderFooter } from "./utils.mjs";
import { login } from "./auth.mjs";

loadHeaderFooter();

const receive = getParam("redirect");

let formtag = document.querySelector("#login-form");
formtag.addEventListener("submit",(e) => {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    login({username, password}, receive) ;
});
