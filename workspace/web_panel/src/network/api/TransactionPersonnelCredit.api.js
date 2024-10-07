import axios from "axios";
import {TransactionPersonnelCredit} from "./const_api";

//personnel credit
export function TransactionPersonnelCredit_query(data) {
    return axios.post(TransactionPersonnelCredit.query, data);
}
