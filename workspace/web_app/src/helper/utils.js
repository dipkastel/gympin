import {AuthApi} from "../network/const/NETWORKCONSTS";

export const toAbsoluteUrl = (pathname) => process.env.PUBLIC_URL + pathname;


export const getImagePath = (imageId)=>AuthApi.BASEURL+"/image/display/"+imageId;

export function checkMobileValid(mobileNumber) {
    return mobileNumber.match("^(\\+98|0)?9\\d{9}$");
}
export default function GetStringPrice(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function fixMobile(mobileNumber) {
    console.log(mobileNumber)
    console.log(mobileNumber.toString()[0])
    switch (mobileNumber.toString()[0]) {
        case "0" : return  mobileNumber.toString()
        case "+": return mobileNumber.replace("+98","0")
        case "9": return "0"+mobileNumber
    }
}

export function removeStorage(key) {
    try {
        localStorage.setItem(key, "");
        localStorage.setItem(key + "_expiresIn", "");
    } catch (e) {
        console.log(
            "removeStorage: Error removing key [" +
            key +
            "] from localStorage: " +
            JSON.stringify(e)
        );
        return false;
    }
    return true;
}

export function getStorage(key) {
    const now = Date.now(); //epoch time, lets deal only with integer
    // set expiration for storage
    let expiresIn = localStorage.getItem(key + "_expiresIn");
    if (expiresIn === undefined || expiresIn === null) {
        expiresIn = 0;
    }

    expiresIn = Math.abs(expiresIn);
    if (expiresIn < now) {
        // Expired
        removeStorage(key);
        return null;
    } else {
        try {
            const value = localStorage.getItem(key);
            return value;
        } catch (e) {
            console.log(
                "getStorage: Error reading key [" +
                key +
                "] from localStorage: " +
                JSON.stringify(e)
            );
            return null;
        }
    }
}
export function setStorage(key, value, expires) {
    if (expires === undefined || expires === null) {
        expires = 24 * 60 * 60; // default: seconds for 1 day
    }

    const now = Date.now(); //millisecs since epoch time, lets deal only with integer
    const schedule = now + expires * 1000;
    try {
        localStorage.setItem(key, value);
        localStorage.setItem(key + "_expiresIn", schedule);
    } catch (e) {
        console.log(
            "setStorage: Error setting key [" +
            key +
            "] in localStorage: " +
            JSON.stringify(e)
        );
        return false;
    }
    return true;
}
