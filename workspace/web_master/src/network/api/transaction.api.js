import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";



export function transactionUser_query(data) {
    return axios.post(Api_url.transactionUser.query, data);
}

