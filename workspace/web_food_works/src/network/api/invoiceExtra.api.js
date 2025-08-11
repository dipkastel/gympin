import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function InvoiceExtra_add(param) {
  return axios.post(Api_url.invoiceExtra.add, param);
}

export function InvoiceExtra_delete(param) {
  return axios.put(Api_url.invoiceExtra.delete, param);
}

export function InvoiceExtra_update(param) {
  return axios.put(Api_url.invoiceExtra.update, param);
}

export function InvoiceExtra_query(param) {
  return axios.post(Api_url.invoiceExtra.query, param);
}
