import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

//gift

export function gift_claim(data) {
    return axios.post(Api_url.gift.claim, data);
}
