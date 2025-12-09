import axios from "axios";
import {SettlementUserDepositApi} from "./const_api";

//SettlementUserDeposit

export function SettlementUserDeposit_add(data) {
    return axios.post(SettlementUserDepositApi.add, data);
}

export function SettlementUserDeposit_delete(data) {
    return axios.put(SettlementUserDepositApi.delete, data);
}

export function SettlementUserDeposit_getAll() {
    return axios.get(SettlementUserDepositApi.getAll);
}

export function SettlementUserDeposit_update(data) {
    return axios.put(SettlementUserDepositApi.update, data);
}

export function SettlementUserDeposit_query(data) {
    return axios.post(SettlementUserDepositApi.query, data);
}


export function SettlementUserDeposit_confirmSettlementRequest(data) {
    return axios.post(SettlementUserDepositApi.confirmSettlementRequest, data);
}



export function SettlementUserDeposit_getAllCreditors() {
    return axios.get(SettlementUserDepositApi.getAllCreditors);
}

