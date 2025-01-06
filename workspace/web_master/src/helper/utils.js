export const toAbsoluteUrl = (pathname) => process.env.PUBLIC_URL + pathname;


export const getImagePath = (imageId) => "/image/display/" + imageId;

export function checkMobileValid(mobileNumber) {
    mobileNumber = fixPersianNumbers(mobileNumber);
    return mobileNumber.toString().match("^(\\+98|0)?9\\d{9}$");
}

export default function GetStringPrice(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function compareObjs(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function fixMobile(mobileNumber) {
    if(!mobileNumber) return 0;
    mobileNumber = fixPersianNumbers(mobileNumber);
    mobileNumber=mobileNumber.replaceAll(/\D/g,"");
    if(mobileNumber.length>11){
        mobileNumber=mobileNumber.substring(0,11);
    }
    switch (mobileNumber.toString()[0]) {
        case "0" :
            return mobileNumber.toString()
        case "+":
            return mobileNumber.replace("+98", "0")
        case "9":
            return "0" + mobileNumber
        default:
            return "0" ;
    }
}

export function fixPersianNumbers(number) {
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

export function getFixPlaceName(place,char,startWith) {
    var result = place?.Name;
    try{
        if(place?.Name?.length>char)
            result = place?.Name?.substring(0,char)+"...";
        if(startWith)
            result = startWith+result;
        return result;
    }catch (e){}
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

export function toPriceWithComma(price) {
    price = fixPersianNumbers(price);
    if (!price) return "0";
    price = (price+"").split('.')[0]
    if (price.length > 1 && price.startsWith("0")) price = price.substring(1, price.length);
    return (price + "")
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function toPriceWithoutComma(price) {
    price = fixPersianNumbers(price);
    if (!price) return "";
    return (price + "").replace(/\D/g, "");
}


export function getUserFixedName(user) {
    if (!user) return "";
    return (user.FullName || "") + " " + " ( " + (user.Username || "") + " ) ";
}


//maximum id 999999999
//TODO ino ye check bokon fek konam ghalate
export function encryptId(id, dynamic) {
    let len = id.toString().length;
    var extraCharCount = (!dynamic) ? Math.round(Math.random() * (9 - len)) : 0;
    var result = "";
    var subs = [];
    var l = 0;
    while (subs.length < len) {
        let newSub = (Math.round((!dynamic ? Math.random() : l) * (len + extraCharCount)));
        l++;
        if (!subs.includes(newSub)) {
            subs.push(newSub);
        }
    }
    var i = 0;
    while (result.length <= (len + extraCharCount)) {
        if (subs.includes(result.length)) {
            result += id.toString().substring(subs.indexOf(result.length), subs.indexOf(result.length) + 1);
        } else {
            result += Math.round((!dynamic ? Math.random() : i) * 9);
            i++;
        }
    }
    subs.forEach(item => {
        result += item;
    })
    result += len.toString();
    return result;
}

//maximum subscribe id 999999999
export function decryptId(qr) {
    let charCount = qr.substring(qr.length - 1, qr.length);
    var result = "";
    for (var i = Number(charCount - 1); i >= 0; i--) {
        result += qr.substring(Number(qr.substring(qr.length - i - 2, qr.length - i - 1)), Number(qr.substring(qr.length - i - 2, qr.length - i - 1)) + 1);
    }
    return result;
}

export function resizeCanvas(canvas, newH, newW) {
    if (newH && !newW)
        newW = (canvas.width * newH) / canvas.height
    else if (newW && !newH)
        newH = (canvas.height * newW) / canvas.width
    else if (!newW && !newH) {
        return null;
    }
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = newW;
    tempCanvas.height = newH;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(canvas, 0, 0, newW, newH);
    return tempCanvas;
}
