import { getParam, getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const receive = getParam("redirect");

document.querySelector("#login-submit").addEventListener("click",(e) => {
    e.preventDefault();
    console.log('this works');
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    login(username, password, receive) ;
})
