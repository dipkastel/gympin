import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function getMainPage() {
    return axios.get(Api_url.Account.LOGIN_URL);
}
