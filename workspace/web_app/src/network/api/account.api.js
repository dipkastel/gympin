import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function login(loginData) {
    return axios.post(Api_url.Account.LOGIN_URL, loginData);
}

export function sendSms(userdata) {
    return axios.post(Api_url.Account.SEND_SMS_URL, userdata);
}

export function registerWithInviteCode(userdata) {
    return axios.post(Api_url.Account.REGISTER_WITH_INVITE_CODE, userdata);
}

export function getInviteCodes() {
    return axios.get(Api_url.Account.GET_INVITE_CODES);
}


export function refreshToken(refreshToken) {
    return axios.post(Api_url.Account.REFRESH_TOKEN, {RefreshToken:refreshToken});
}

