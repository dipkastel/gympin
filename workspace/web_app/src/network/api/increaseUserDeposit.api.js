import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function increaseUserDeposit_requestIncreaseUserDeposits(data) {
    return axios.post(Api_url.increaseUserDeposit.requestIncreaseUserDeposits, data);
}

export function IncreaseUserDeposit_query(data) {
    return axios.post(Api_url.increaseUserDeposit.query, data);
}
