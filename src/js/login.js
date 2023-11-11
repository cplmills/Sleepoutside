import { getParam, loadHeaderFooter } from "./utils.mjs";
import { login } from "./auth.mjs"

loadHeaderFooter();
const receive = getParam("redirect");

document.querySelector("#login-submit").addEventListener("click",(e) => {
    e.preventDefault();
    console.log('this works');
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    login({email, password}, receive) ;
})
