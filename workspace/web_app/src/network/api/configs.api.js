import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function configs_getWebAppSplash(data) {
    return axios.post(Api_url.configs.WebAppSplash,data);
}
