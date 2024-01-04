import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export function SettlementUserDeposit_query(data) {
    return axios.post(Api_url.settlementUserDeposit.query, data);
}

export function SettlementUserDeposit_add(data) {
    return axios.post(Api_url.settlementUserDeposit.add, data);
}
