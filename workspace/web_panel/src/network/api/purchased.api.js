import axios from "axios";
import {PurchasedApi} from "./const_api";


export function Purchased_getAll() {
    return axios.get(PurchasedApi.getAll);
}

export function Purchased_update(data) {
    return axios.put(PurchasedApi.update, data);
}

export function Purchased_getById(data) {
    return axios.get(PurchasedApi.getById, {params: data});
}

export function Purchased_query(data) {
    return axios.post(PurchasedApi.query, data);
}
