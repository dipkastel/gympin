import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function invoice_add(data) {
    return axios.post(Api_url.invoice.add, data);
}
export function invoice_query(data) {
    return axios.post(Api_url.invoice.query, data);
}
export function invoice_addBuyable(data) {
    return axios.post(Api_url.invoice.addBuyable, data);
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
