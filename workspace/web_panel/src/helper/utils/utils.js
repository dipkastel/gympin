import {AuthApi, MultimediaApi} from "../../network/api/const_api";
import {Support_query} from "../../network/api/support.api";
import {CorporateContractType} from "../enums/CorporateContractType";

export function getImageUrlByName(name, Height = 0, Width = 0) {
  var url = AuthApi.BASEURL+MultimediaApi.getByName+"?fileName=" + name;
  if (Height !== 0) url += "&height=" + Height;
  if (Width !== 0) url += "&width=" + Width;
  return url;
}
export function getImageUrlById(id, Height = 0, Width = 0) {
  var url = AuthApi.BASEURL+MultimediaApi.getById+"?Id=" + id;
  if (Height !== 0) url += "&height=" + Height;
  if (Width !== 0) url += "&width=" + Width;
  return url;
}

export function getRandStr(length) {
  const list = "ABCDEFGHJKMNPQRSTUVWXYZ123456789";
  var res = "";
  for(var i = 0; i < length; i++) {
    var rnd = Math.floor(Math.random() * list.length);
    res = res + list.charAt(rnd);
  }
  return res;
}


export function getUserFixedName(user) {
  if(!user) return "";
  return (user.FullName || "") + " " + " ( " + (user.Username || "") + " ) ";
}
export function getPlaceFixedName(place) {
  if(!place) return "";
  return (place.Name || "") ;
}
export function getCorporateFixedName(corporate) {
  if(!corporate) return "";
  return (corporate.Name || "") + " " + " ( " + (CorporateContractType[corporate.ContractType] || "") + " ) ";
}

//
// export async function getSupportCount() {
//   Support_query({
//     queryType: "FILTER",
//     Status:"AWAITING_EXPERT",
//     paging: {Page: 0, Size: 200, Desc: true}
//   })
//       .then((data) => {
//         return data.data.Data.length;
//       })
//   return 0
// }


export function toPriceWithComma(price){
  if(!price) return "0";
  console.log(price);
  price = (price+"").split('.')[0]
  if(price.length>1&&price.startsWith("0")) price = price.substring(1,price.length);
  return (price+"")
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function toPriceWithoutComma(price){
  if(!price) return "";
  return (price+"").replace(/\D/g, "");
}



export function removeCSSClass(ele, cls) {
  const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
  ele.className = ele.className.replace(reg, " ");
}

export function addCSSClass(ele, cls) {
  ele.classList.add(cls);
}
export function checkMobileValid(mobileNumber) {
  return mobileNumber.match("^(\\+98|0)?9\\d{9}$");
}

export const toAbsoluteUrl = (pathname) => process.env.PUBLIC_URL + pathname;

/*  removeStorage: removes a key from localStorage and its sibling expiracy key
    params:
        key <string>     : localStorage key to remove
    returns:
        <boolean> : telling if operation succeeded
 */
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

/*  getStorage: retrieves a key from localStorage previously set with setStorage().
    params:
        key <string> : localStorage key
    returns:
        <string> : value of localStorage key
        null : in case of expired key or failure
 */
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
/*  setStorage: writes a key into localStorage setting a expire time
    params:
        key <string>     : localStorage key
        value <string>   : localStorage value
        expires <number> : number of seconds from now to expire the key
    returns:
        <boolean> : telling if operation succeeded
 */
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
