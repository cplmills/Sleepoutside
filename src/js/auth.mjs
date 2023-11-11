import { loginRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import  { jwtDecode }  from "jwt-decode";

const tokenKey = "so-token";

export async function login(creds, redirect = "/") {
    try {
        console.log(creds)
        const token = await loginRequest(creds);
        setLocalStorage(tokenKey, token);
        // because of the default arg provided above...if no redirect is provided send them Home.
        window.location = redirect;
    } catch (err) {
        console.log(err);
        alertMessage(err.message);
    }
}

export function isTokenValid(token){
    if (token){
        const decode = jwtDecode(token);
        const decode = jwtDecode(token);
        let currentDate = new Date();
        
        if (decode.exp * 1000 < currentDate.getTime()) {
            console.log("Token Expired")
            return false;
        } else {
            console.log("Token okay");
            return true;
        }
    } else {
        return false;
    }
};

export function checkLogin() {
    const token = getLocalStorage(tokenKey);
    if (isTokenValid(token)) {
        return token;
    } else {
        localStorage.removeItem(tokenKey);
        const location = window.location;
        window.location = `./login/index.html?redirect=${location.pathname}`;
    }

    
};

