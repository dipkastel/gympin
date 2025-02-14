import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function giftCredit_checkStatus(data) {
    return axios.get(Api_url.giftCredit.checkStatus, {params: data});
}
