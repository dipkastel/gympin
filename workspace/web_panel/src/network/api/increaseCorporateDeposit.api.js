import axios from "axios";
import {IncreaseCorporateDepositApi} from "./const_api";

//IncreaseCorporateDeposit

export function IncreaseCorporateDeposit_add(data) {
    return axios.post(IncreaseCorporateDepositApi.add, data);
}

export function IncreaseCorporateDeposit_delete(data) {
    return axios.put(IncreaseCorporateDepositApi.delete, data);
}

export function IncreaseCorporateDeposit_getAll() {
    return axios.get(IncreaseCorporateDepositApi.getAll);
}

export function IncreaseCorporateDeposit_update(data) {
    return axios.put(IncreaseCorporateDepositApi.update, data);
}

export function IncreaseCorporateDeposit_query(data) {
    return axios.post(IncreaseCorporateDepositApi.query, data);
}

export function IncreaseCorporateDeposit_confirmIncreaseRequest(data) {
    return axios.post(IncreaseCorporateDepositApi.confirmIncreaseRequest, data);
}
