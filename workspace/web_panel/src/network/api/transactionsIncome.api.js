import axios from "axios";
import {TransactionIncomeApi} from "./const_api";

//subscribe
export function transactionIncome_query(data) {
    return axios.post(TransactionIncomeApi.query, data);
}
