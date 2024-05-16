
export const toAbsoluteUrl = (pathname) => process.env.PUBLIC_URL + pathname;


export const getImagePath = (imageId)=>"/image/display/"+imageId;

export function checkMobileValid(mobileNumber) {
    return mobileNumber.toString().match("^(\\+98|0)?9\\d{9}$");
}
export default function GetStringPrice(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function compareObjs(obj1,obj2){
    return JSON.stringify(obj1)===JSON.stringify(obj2);
}
export function fixMobile(mobileNumber) {
    switch (mobileNumber.toString()[0]) {
        case "0" : return  mobileNumber.toString()
        case "+": return mobileNumber.replace("+98","0")
        case "9": return "0"+mobileNumber
    }
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

export function getUserFixedName(user) {
    if(!user) return "";
    return (user.FullName || "") + " " + " ( " + (user.Username || "") + " ) ";
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


//maximum id 999999999
//TODO ino ye check bokon fek konam ridam
export function encryptId(id,dynamic) {
    let len = id.toString().length;
    var extraCharCount = (!dynamic)?Math.round(Math.random() * (9-len)):0;
    var result = "";
    var subs = [];
    var l = 0;
    while (subs.length < len) {
        let newSub = (Math.round((!dynamic?Math.random():l) * (len+extraCharCount)));
        l++;
        if (!subs.includes(newSub)) {
            subs.push(newSub);
        }
    }
    var i = 0;
    while (result.length <= (len+extraCharCount)) {
        if (subs.includes(result.length)){
            result += id.toString().substring(subs.indexOf(result.length), subs.indexOf(result.length) + 1);
        }
        else {
            result += Math.round((!dynamic?Math.random():i) * 9);
            i++;
        }
    }
    subs.forEach(item=>{
        result+=item;
    })
    result+=len.toString();
    return result;
}

//maximum subscribe id 999999999
export function decryptId(qr) {
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
