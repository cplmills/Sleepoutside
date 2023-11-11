import { loginRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import jwt_decode from "jwt-decode";

const tokenKey = "so-token";

export async function login(creds,redirect = "/") {
    try {
        const token = await loginRequest(creds);
        setLocalStorage(tokenKey, token);
        // because of the default arg provided above...if no redirect is provided send them Home.
        window.location = redirect;
    } catch (err) {
        alertMessage(err.message.message);
    }
};

export function isTokenValid(token){
    if (token){
        const decode = jwt_decode(token);
        let currentDate = new Date();
        
        if (decode.exp * 1000 < currentDate.getTime()) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
};

export function checkLogin() {
    const token = getLocalStorage("so-token");
    if (isTokenValid(token)) {
        return token;
    } else {
        localStorage.removeItem("so-token");
        const location = window.location;
        window.location = `./login/index.html?redirect=${location}`;
    }

    
};

