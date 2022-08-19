import axios from "axios";
import {Account} from "../const/NETWORKCONSTS";

export function login(loginData) {
    return axios.post(Account.LOGIN_URL, loginData);
}

export function sendSms(userdata) {
    return axios.post(Account.SEND_SMS_URL, userdata);
}
