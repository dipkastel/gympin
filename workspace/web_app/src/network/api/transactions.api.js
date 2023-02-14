import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function transactions_getPaymentGateways(data) {
    return axios.post(Api_url.transaction.getPaymentGateways,  data);
}

export function transactions_setPaymentRequest(data) {
    return axios.post(Api_url.transaction.setPaymentRequest,  data);
}


export function transactions_checkPayment(data) {
    return axios.post(Api_url.transaction.checkPayment,  data);
}
