import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function increaseCorporateDeposit_requestIncreaseCorporateDeposits(data) {
    return axios.post(Api_url.increaseCorporateDeposit.requestIncreaseCorporateDeposits, data);
}
