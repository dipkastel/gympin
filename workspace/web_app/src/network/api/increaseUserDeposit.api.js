import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function increaseUserDeposit_requestIncreaseUserDeposits(data) {
    return axios.post(Api_url.increaseUserDeposit.requestIncreaseUserDeposits, data);
}
