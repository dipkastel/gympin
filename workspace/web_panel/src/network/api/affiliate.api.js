import axios from "axios";
import {AffiliateApi} from "./const_api";

export function affiliate_add(data) {
    return axios.post(AffiliateApi.add, data);
}
export function affiliate_delete(data) {
    return axios.put(AffiliateApi.delete,  data );
}
export function affiliate_getAll() {
    return axios.get(AffiliateApi.getAll);
}
export function affiliate_getById(data) {
    return axios.get(AffiliateApi.getById,{ params: data });
}
export function affiliate_update(data) {
    return axios.put(AffiliateApi.update, data);
}
export function affiliate_query(data) {
    return axios.post(AffiliateApi.query,data);
}
