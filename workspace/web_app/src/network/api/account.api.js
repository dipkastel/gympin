import axios from "axios";
import { Api_url} from "../const/NETWORKCONSTS";

export function login(loginData) {
    return axios.post(Api_url.Account.LOGIN_URL, loginData);
}

export function sendSms(userdata) {
    return axios.post(Api_url.Account.SEND_SMS_URL, userdata);
}
