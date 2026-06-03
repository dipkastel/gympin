import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function Page_getHomePage(data) {
    return axios.get(Api_url.homePage.GetHome,{params:data});
}

export function Page_getPageBydata(data) {
    return axios.get(Api_url.homePage.GetPageByData,{params:data});
}
