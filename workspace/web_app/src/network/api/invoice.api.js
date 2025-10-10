import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function invoice_add(data) {
    return axios.post(Api_url.invoice.add, data);
}
export function invoice_query(data) {
    return axios.post(Api_url.invoice.query, data);
}
export function invoice_getHowToPay(data) {
    return axios.post(Api_url.invoice.getHowToPay, data);
}

export function invoice_getById(invoiceId) {
    return axios.get(Api_url.invoice.getById,{params:{id:invoiceId}});
}
export function invoice_getBasketByUserId(userId) {
    return axios.get(Api_url.invoice.getBasketByUserId,{params:{id:userId}});
}
export function invoice_addBuyable(data) {
    return axios.post(Api_url.invoice.addBuyable, data);
}

export function invoice_addSubscribe(data) {
    return axios.post(Api_url.invoice.addSubscribe, data);
}

export function invoice_changeInvoiceBuyableCount(data) {
    return axios.post(Api_url.invoice.changeInvoiceBuyableCount, data);
}
export function invoice_deleteBuyable(data) {
    return axios.put(Api_url.invoice.deleteBuyable, data);
}
export function invoice_userCheckout(data) {
    return axios.post(Api_url.invoice.userCheckout, data);
}

export function invoice_SmartisCheckOut(data) {
    return axios.post(Api_url.invoice.SmartisCheckOut, data);
}
