import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function configs_getWebMasterSplash(data) {
    return axios.post(Api_url.configs.WebMasterSplash,data);
}
