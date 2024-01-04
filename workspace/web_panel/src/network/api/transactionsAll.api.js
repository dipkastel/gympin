import axios from "axios";
import {TransactionAllApi} from "./const_api";

//subscribe
export function transactionAll_query(data) {
    return axios.post(TransactionAllApi.query, data);
}

//
// export function transaction_placeSetteling(data) {
//     return axios.post(TransactionAllApi.placeSetteling, data);
// }
//
// export function transaction_handCheckPayment(data) {
//     return axios.post(TransactionAllApi.handCheckPayment, data);
// }
//
// export function transaction_setPaymentRequest(data) {
//     return axios.post(TransactionAllApi.setPaymentRequest, data);
// }
