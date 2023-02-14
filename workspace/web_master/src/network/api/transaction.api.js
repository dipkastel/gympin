import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export function transaction_getByPlaceId(data) {
    return axios.get(Api_url.transaction.getByPlaceId, {params: data});
}

export function transaction_query(data) {
    return axios.post(Api_url.transaction.query, data);
}

export function transaction_settlementRequest(data) {
    return axios.post(Api_url.transaction.settlementRequest, data);
}
