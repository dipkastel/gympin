import axios from "axios";
import {IncreaseUserDepositApi} from "./const_api";

//IncreaseUserDeposit

export function IncreaseUserDeposit_add(data) {
    return axios.post(IncreaseUserDepositApi.add, data);
}

export function IncreaseUserDeposit_delete(data) {
    return axios.put(IncreaseUserDepositApi.delete, data);
}

export function IncreaseUserDeposit_getAll() {
    return axios.get(IncreaseUserDepositApi.getAll);
}

export function IncreaseUserDeposit_update(data) {
    return axios.put(IncreaseUserDepositApi.update, data);
}

export function IncreaseUserDeposit_query(data) {
    return axios.post(IncreaseUserDepositApi.query, data);
}


export function IncreaseUserDeposit_confirmIncreaseRequest(data) {
    return axios.post(IncreaseUserDepositApi.confirmIncreaseRequest, data);
}

