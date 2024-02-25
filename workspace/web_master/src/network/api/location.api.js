import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export function location_query(data) {
    return axios.post(Api_url.Location.query, data);
}
