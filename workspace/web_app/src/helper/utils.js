import {AuthApi} from "../network/api/NETWORKCONSTS";

export const toAbsoluteUrl = (pathname) => process.env.PUBLIC_URL + pathname;


export const getImagePath = (imageId)=>AuthApi.BASEURL+"/image/display/"+imageId;

export function checkMobileValid(mobileNumber) {
    return mobileNumber.match("^(\\+98|0)?9\\d{9}$");
}
export default function GetStringPrice(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function compareObjs(obj1,obj2){
    return JSON.stringify(obj1)===JSON.stringify(obj2);
}

export function toPriceWithComma(price){
    if(!price) return "0";
    if(price.length>1&&price.startsWith("0")) price = price.substring(1,price.length);
    return (price+"")
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function toPriceWithoutComma(price){
    if(!price) return "";
    return (price+"").replace(/\D/g, "");
}

export function fixMobile(mobileNumber) {
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

export function getTicketPersianStatus(text){
    var messages = {
        NEW:"جدید",
        PROCESSING:"در حال انجام",
        AWAITING_USER:"در انتظار پاسخ",
        AWAITING_EXPERT:"در انتظار کارشناس",
        COMPLETE:"تکمیل شده",
        CANCEL:"لغو شده"}

    return messages[text];
}

//maximum ticket id 999999999
export function generateTicketCode(ticketId) {
    let len = ticketId.toString().length;
    var extraCharCount = Math.round(Math.random() * (9-len));
    var result = "";
    var subs = [];
    while (subs.length < len) {
        let newSub = (Math.round(Math.random() * (len+extraCharCount)));
        if (!subs.includes(newSub)) {
            subs.push(newSub);
        }
    }
    while (result.length <= (len+extraCharCount)) {
        if (subs.includes(result.length)){
            result += ticketId.toString().substring(subs.indexOf(result.length), subs.indexOf(result.length) + 1);
            // result+="c"
        }
        // else result+="0"
         else result += Math.round(Math.random() * 9);
    }
    subs.forEach(item=>{
        result+=item;
        // result+="N"
    })
    result+=len.toString();
    return result;
}

//maximum ticket id 999999999
export function getTicketIdByQr(qr) {
    let charCount  = qr.substring(qr.length-1,qr.length);
    var result = "";
    for (var i =Number(charCount-1);i>=0;i--){
         result+= qr.substring(Number(qr.substring(qr.length-i-2,qr.length-i-1)),Number(qr.substring(qr.length-i-2,qr.length-i-1))+1);
    }
    return result;
}
