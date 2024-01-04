import axios from "axios";
import {InvoiceApi} from "./const_api";

//invoice
export function invoice_add(data) {
    return axios.post(InvoiceApi.add, data);
}

export function invoice_delete(data) {
    return axios.put(InvoiceApi.delete, data);
}

export function invoice_getAll(_page, _size) {
    return axios.get(InvoiceApi.getAll, {params: {page: _page, size: _size}});
}

export function invoice_getById(data) {
    return axios.get(InvoiceApi.getById, {params: data});
}

export function invoice_query(data) {
    return axios.post(InvoiceApi.query, data);
}

export function invoice_checkout(data) {
    return axios.post(InvoiceApi.checkout, data);
}

export function invoice_changeStatus(data) {
    return axios.post(InvoiceApi.changeStatus, data);
}

export function invoice_addBuyable(data) {
    return axios.post(InvoiceApi.addBuyable, data);
}

export function invoice_changeInvoiceBuyableCount(data) {
    return axios.post(InvoiceApi.changeInvoiceBuyableCount, data);
}

export function invoice_deleteBuyable(data) {
    return axios.put(InvoiceApi.deleteBuyable, data);
}
