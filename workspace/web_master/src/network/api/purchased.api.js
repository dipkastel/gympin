import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export function purchased_query(data) {
    return axios.post(Api_url.Purchased.query, data);
}



