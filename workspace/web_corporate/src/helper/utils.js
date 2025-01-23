
export const toAbsoluteUrl = (pathname) => process.env.PUBLIC_URL + pathname;


export const getImagePath = (imageId)=>"/image/display/"+imageId;
let persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
let arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
   function fixFarsiNumbers(str)
    {
        if(typeof str === 'string')
        {
            for(var i=0; i<10; i++)
            {
                str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
            }
        }
        return str;
    };
export function checkMobileValid(mobileNumber) {
    try {
        return mobileNumber.match("^(\\+98|0)?9\\d{9}$");
    }catch (e) {
        return false;
    }
}

export function toPriceWithComma(price){
    if(!price) return "0";
    price = fixFarsiNumbers(price);
    // if(price.length>1&&price.startsWith("0")) price = price.substring(1,price.length);
    price = (price+"").split('.')[0]
    if(price.length>16) return price.substring(0,17);
    var number = parseInt(toPriceWithoutComma(price));
    return (Math.round(number)+"")
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function toPriceWithoutComma(price){
    if(!price) return "";
    return (price+"").replace(/\D/g, "");
}

export function fixMobile(mobileNumber) {
    mobileNumber = fixFarsiNumbers(mobileNumber);
    switch (mobileNumber.toString()[0]) {
        case "0" : return  mobileNumber.toString()
        case "+": return mobileNumber.replace("+98","0")
        case "9": return "0"+mobileNumber
    }
}

export function getUserFixedName(user) {
    if(!user) return "";
    return (user.FullName || "") + " " + " ( " + (user.Username || "") + " ) ";
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
