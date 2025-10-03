import axios from "axios";
import {CorporateApi} from "./const_api";

export function corporate_add(data) {
    return axios.post(CorporateApi.add, data);
}
export function corporate_delete(data) {
    return axios.put(CorporateApi.delete,  data );
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
export function corporate_updateContractDate(data) {
    return axios.put(CorporateApi.updateContractDate, data);
}
export function corporate_updateContractType(data) {
    return axios.put(CorporateApi.updateContractType, data);
}
export function corporate_updateDefaultExpireDuratione(data) {
    return axios.put(CorporateApi.updateDefaultExpireDuration, data);
}
export function corporate_updateStepPayment(data) {
    return axios.put(CorporateApi.updateStepPayment, data);
}
export function corporate_query(data) {
    return axios.post(CorporateApi.query,data);
}
export function corporate_getFinanceCorporate(data) {
    return axios.get(CorporateApi.getFinanceCorporate,{ params: data });
}

export function corporate_getTotalIncreases(data) {
    return axios.post(CorporateApi.getTotalIncreases,data);
}
// groups

export function corporate_getCorporateGroups(data) {
    return axios.get(CorporateApi.getCorporateGroups,{ params: data });
}
export function corporate_addGroup(data) {
    return axios.post(CorporateApi.addGroup, data);
}
export function corporate_deleteGroup(data) {
    return axios.put(CorporateApi.deleteGroup,  data );
}

export function corporate_getCorporateInviteCode(corporate) {
    return axios.get(CorporateApi.getCorporateInviteCode, {params: corporate});
}
