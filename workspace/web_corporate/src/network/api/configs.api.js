import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function configs_getCorporateSplash(data) {
    return axios.post(Api_url.configs.CorporateSplash,data);
}
