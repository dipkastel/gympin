import axios from "axios";
import {AccountApi} from "../NETWORKCONSTS.js";


export function account_requestRegisterAdvise(data) {
    return axios.post(AccountApi.requestRegisterAdvise, data);
}


export function account_requestPublicMessage(data) {
    return axios.post(AccountApi.requestPublicMessage, data);
}

export function account_requestRegisterCorporate(data) {
    return axios.post(AccountApi.requestRegisterCorporate, data);
}
