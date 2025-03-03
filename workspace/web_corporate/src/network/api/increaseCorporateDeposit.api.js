import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function increaseCorporateDeposit_requestIncreaseCorporateDeposits(data) {
    return axios.post(Api_url.increaseCorporateDeposit.requestIncreaseCorporateDeposits, data);
}

export function increaseCorporateDeposit_requestIncreaseCorporateDepositsDraft(data) {
    return axios.post(Api_url.increaseCorporateDeposit.requestIncreaseCorporateDepositsDraft, data);
}
export function increaseCorporateDeposit_completeRequestIncreaseCorporateDeposits(data) {
    return axios.post(Api_url.increaseCorporateDeposit.completeRequestIncreaseCorporateDeposits, data);
}

export function increaseCorporateDeposit_getProFromaInvoice(data) {
    return axios.get(Api_url.increaseCorporateDeposit.getProFormaInvoice,{params: data,responseType:"blob"});
}

export function increaseCorporateDeposit_delete(data) {
    return axios.put(Api_url.increaseCorporateDeposit.delete, data );
}
