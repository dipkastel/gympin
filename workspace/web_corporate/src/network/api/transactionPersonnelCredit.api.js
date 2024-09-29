import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function TransactionPersonnelCredit_query(data) {
    return axios.post(Api_url.TransactionPersonnelCredit.query, data);
}
