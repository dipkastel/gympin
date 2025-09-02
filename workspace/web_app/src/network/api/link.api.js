import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function link_getByCode(data) {
    return axios.get(Api_url.Link.getByCode, {params: data});
}
