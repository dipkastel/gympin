import axios from "axios";
import {TicketApi, TransactionApi} from "./const_api";

//ticket
export function transaction_query(data) {
    return axios.post(TransactionApi.query, data);
}

export function transaction_placeSetteling(data) {
    return axios.post(TransactionApi.placeSetteling, data);
}
export function transaction_handCheckPayment(data) {
    return axios.post(TransactionApi.handCheckPayment, data);
}

export function transaction_setPaymentRequest(data) {
    return axios.post(TransactionApi.setPaymentRequest, data);
}
