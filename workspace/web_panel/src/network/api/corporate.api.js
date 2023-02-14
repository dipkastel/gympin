import axios from "axios";
import {CorporateApi} from "./const_api";

export function corporate_add(data) {
    return axios.post(CorporateApi.add, data);
}
export function corporate_delete(data) {
    return axios.put(CorporateApi.delete, null,{ params: data });
}
export function corporate_getAll() {
    return axios.get(CorporateApi.getAll);
}
export function corporate_getById(data) {
    return axios.get(CorporateApi.getById,{ params: data });
}
export function corporate_getByUser(data) {
    return axios.get(CorporateApi.getByUser,{ params: data });
}
export function corporate_getTransactions(data) {
    return axios.get(CorporateApi.getTransactions,{ params: data });
}
export function corporate_getTotalDeposit(data) {
    return axios.get(CorporateApi.getTotalDeposit,{ params: data });
}
export function corporate_update(data) {
    return axios.put(CorporateApi.update, data);
}
export function corporate_updateStatus(data) {
    return axios.put(CorporateApi.updateStatus, data);
}
export function corporate_query(data) {
    return axios.post(CorporateApi.query,data);
}
