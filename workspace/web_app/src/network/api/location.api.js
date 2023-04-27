import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export function Location_query(data) {
    return axios.post(Api_url.location.query, data);
}
