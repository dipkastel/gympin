import axios from "axios";
import {TicketApi, TransactionApi} from "./const_api";

//ticket
export function transaction_query(data) {
    return axios.post(TransactionApi.query, data);
}

export function transaction_placeSetteling(data) {
    return axios.post(TransactionApi.placeSetteling, data);
}
