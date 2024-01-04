import axios from "axios";
import {TransactionCorporateApi} from "./const_api";

//subscribe
export function transactionCorporate_query(data) {
    return axios.post(TransactionCorporateApi.query, data);
}

export function transactionCorporate_placeSetteling(data) {
    return axios.post(TransactionCorporateApi.placeSetteling, data);
}

export function transactionCorporate_handCheckPayment(data) {
    return axios.post(TransactionCorporateApi.handCheckPayment, data);
}

export function transactionCorporate_setPaymentRequest(data) {
    return axios.post(TransactionCorporateApi.setPaymentRequest, data);
}
