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
export function affiliate_AddCorporatesToAffiliator(data) {
    return axios.post(AffiliateApi.AddCorporatesToAffiliator,data);
}
export function affiliate_getCorporatesByAffiliatorId(id) {
    return axios.get(AffiliateApi.getCorporatesByAffiliatorId,{ params: id });
}
export function affiliate_AddPlaceToAffiliator(data) {
    return axios.post(AffiliateApi.AddPlaceToAffiliator,data);
}
export function affiliate_getPlacesByAffiliatorId(id) {
    return axios.get(AffiliateApi.getPlacesByAffiliatorId,{ params: id });
}
