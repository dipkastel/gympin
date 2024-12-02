import {AuthApi} from "../network/api/NETWORKCONSTS";

export const toAbsoluteUrl = (pathname) => process.env.PUBLIC_URL + pathname;


export const getImagePath = (imageId)=>AuthApi.BASEURL+"/image/display/"+imageId;

export function checkMobileValid(mobileNumber) {
    return mobileNumber.match("^(\\+98|0)?9\\d{9}$");
}
export function checkEmailValid(email) {
    return email.match("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])");
}
export function checkUsername(username) {
    return !username.match("^(?=[0-9|A-Z|a-z|_|-]{3,30}$)(?!.*[_-]{2})[^_-].*[^_-]$");
}

export function fixTextToSlug(text) {
    text = "اطلاعات کامل مجموعه ورزشی "+text + " به همراه آدرس قیمت شماره تماس امکانات"
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-آ-ی]/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}
export function checkNationalCode(code) {
    if (!code) {
        return false;
    }else if (code.trim() == '') {
        return false;
    } else if (code.length != 10) {
        return false;
    } else {
        var sum = 0;

        for (var i = 0; i < 9; i++) {
            sum += parseInt(code[i]) * (10 - i);
        }

        var lastDigit;
        var divideRemaining = sum % 11;

        if (divideRemaining < 2) {
            lastDigit = divideRemaining;
        } else {
            lastDigit = 11 - (divideRemaining);
        }

        if (parseInt(code[9]) == lastDigit) {
            return true;
        } else {
            return false;
        }
    }
}

export default function GetStringPrice(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function compareObjs(obj1,obj2){
    return JSON.stringify(obj1)===JSON.stringify(obj2);
}

export function getStringOfTime(time) {
    if((time+"").length>1)
        return time;
    else
        return "0"+time;
}
export function removePersianNumbers(number) {
    var persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
    var arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

    if (typeof number === 'string') {
        console.log("number",number);
        for (var i = 0; i < 10; i++) {
            number = number.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
    }
    return number;
}
export function replacePersianNumbers(number) {
    var persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    if (typeof number === 'string') {
        for (var i = 0; i < 10; i++) {
            number = number.replaceAll(i,persianNumbers[i]);
        }
    }
    return number;
}

export function toPriceWithComma(price){
    price = removePersianNumbers(price);
    if(!price) return "0";

    price = (price+"").split('.')[0]
    if(price.length>1&&price.startsWith("0")) price = price.substring(1,price.length);
    var result = (price+"")
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    result = replacePersianNumbers(result);
    return result;
}
export function toPriceWithoutComma(price){
    price = removePersianNumbers(price);
    if(!price) return "";
    return (price+"").replace(/\D/g, "");
}

export function fixMobile(mobileNumber) {
    if(!mobileNumber) return 0;
    mobileNumber = removePersianNumbers(mobileNumber);
    switch (mobileNumber.toString()[0]) {
        case "0" : mobileNumber =   mobileNumber.toString()
            break;
        case "+": mobileNumber =  mobileNumber.replace("+98","0")
            break;
        case "9":
            mobileNumber =  "0" + mobileNumber
            break;
        default:
            mobileNumber =  "0" ;
            break;
    }
    mobileNumber=mobileNumber.replaceAll(/\D/g,"");
    if(mobileNumber.length>11){
        mobileNumber=mobileNumber.substring(0,11);
    }
    return mobileNumber;
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

export function getSubscribePersianStatus(text){
    var messages = {
        NEW:"جدید",
        PROCESSING:"در حال انجام",
        AWAITING_USER:"در انتظار پاسخ",
        AWAITING_EXPERT:"در انتظار کارشناس",
        COMPLETE:"تکمیل شده",
        CANCEL:"لغو شده"}

    return messages[text];
}

//maximum purchasedSubscribe id 999999999
export function generateSubscribeCode(subscribeId) {
    let len = subscribeId.toString().length;
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
            result += subscribeId.toString().substring(subs.indexOf(result.length), subs.indexOf(result.length) + 1);
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

//maximum purchasedSubscribe id 999999999
export function getSubscribeIdByQr(qr) {
    let charCount  = qr.substring(qr.length-1,qr.length);
    var result = "";
    for (var i =Number(charCount-1);i>=0;i--){
         result+= qr.substring(Number(qr.substring(qr.length-i-2,qr.length-i-1)),Number(qr.substring(qr.length-i-2,qr.length-i-1))+1);
    }
    return result;
}

export function resizeCanvas(canvas,newH,newW) {
    if(newH&&!newW)
        newW = (canvas.width*newH)/canvas.height
    else if(newW&&!newH)
        newH = (canvas.height*newW)/canvas.width
    else if(!newW&&!newH){
        return null;
    }
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = newW;
    tempCanvas.height = newH;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(canvas, 0, 0, newW, newH);
    return tempCanvas;
}
