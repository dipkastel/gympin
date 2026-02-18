export const toAbsoluteUrl = (pathname) => process.env.PUBLIC_URL + pathname;

export const getImagePath = (imageId) => "/image/display/" + imageId;
let persianNumbers = [
  /۰/g,
  /۱/g,
  /۲/g,
  /۳/g,
  /۴/g,
  /۵/g,
  /۶/g,
  /۷/g,
  /۸/g,
  /۹/g,
];
let arabicNumbers = [
  /٠/g,
  /١/g,
  /٢/g,
  /٣/g,
  /٤/g,
  /٥/g,
  /٦/g,
  /٧/g,
  /٨/g,
  /٩/g,
];

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

function fixFarsiNumbers(str) {
  if (typeof str === "string") {
    for (var i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
}
export function checkMobileValid(mobileNumber) {
  try {
    return mobileNumber.match("^(\\+98|0)?9\\d{9}$");
  } catch (e) {
    return false;
  }
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
export function toPriceWithComma(price) {
  if (!price) return "0";
  price = fixFarsiNumbers(price);
  // if(price.length>1&&price.startsWith("0")) price = price.substring(1,price.length);
  price = (price + "").split(".")[0];
  if (price.length > 16) return price.substring(0, 17);
  var number = parseInt(toPriceWithoutComma(price));
  return (Math.round(number) + "")
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function toPriceWithoutComma(price) {
  if (!price) return "";
  return (price + "").replace(/\D/g, "");
}

export function fixMobile(mobileNumber) {
  mobileNumber = fixFarsiNumbers(mobileNumber);
  switch (mobileNumber.toString()[0]) {
    case "0":
      return mobileNumber.toString();
    case "+":
      return mobileNumber.replace("+98", "0");
    case "9":
      return "0" + mobileNumber;
  }
}

export function getUserFixedName(user) {
  if (!user) return "";
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
        JSON.stringify(e),
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
          JSON.stringify(e),
      );
      return null;
    }
  }
}

export function getStringOfTime(time) {
  if((time+"").length>1)
    return time;
  else
    return "0"+time;
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
        JSON.stringify(e),
    );
    return false;
  }
  return true;
}

export function resizeCanvas(canvas, newH, newW) {
  if (newH && !newW) newW = (canvas.width * newH) / canvas.height;
  else if (newW && !newH) newH = (canvas.height * newW) / canvas.width;
  else if (!newW && !newH) {
    return null;
  }
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = newW;
  tempCanvas.height = newH;
  const tempCtx = tempCanvas.getContext("2d");
  tempCtx.drawImage(canvas, 0, 0, newW, newH);
  return tempCanvas;
}

export function encodeId(id) {
  const mixed = id * 1572;
  return btoa(mixed.toString());
}

export function decodeId(str) {
  try {
    const decoded = atob(str);
    return parseInt(decoded, 10) / 1572;
  } catch {
    return null;
  }
}

export function randomSerialNum(length = 12) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charsLen = chars.length;
  if (
    typeof window !== "undefined" &&
    window.crypto &&
    window.crypto.getRandomValues
  ) {
    const arr = new Uint8Array(length);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, (n) => chars[n % charsLen]).join("");
  }

  if (typeof require === "function") {
    try {
      const crypto = require("crypto");
      const buf = crypto.randomBytes(length);
      return Array.from(buf, (b) => chars[b % charsLen]).join("");
    } catch (e) {}
  }
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars.charAt(Math.floor(Math.random() * charsLen));
  }
  return out;
}
export function playMessageReceived(sender) {
  var sound =
    sender == "Client"
      ? "/assets/sound/messageSent.mp3"
      : "/assets/sound/messageReceived.mp3";
  const audio = new Audio(sound);
  audio.play().catch((err) => {
    console.warn("خطا در پخش صدا:", err);
  });
}


