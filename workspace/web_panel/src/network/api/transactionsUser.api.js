import axios from "axios";
import {TransactionUserApi} from "./const_api";

//subscribe
export function transactionUser_query(data) {
    return axios.post(TransactionUserApi.query, data);
}

export function transactionUser_placeSetteling(data) {
    return axios.post(TransactionUserApi.placeSetteling, data);
}

export function transactionUser_handCheckPayment(data) {
    return axios.post(TransactionUserApi.handCheckPayment, data);
}

export function transactionUser_setPaymentRequest(data) {
    return axios.post(TransactionUserApi.setPaymentRequest, data);
}
