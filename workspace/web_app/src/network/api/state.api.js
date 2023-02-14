import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function getAllStates() {
    return axios.get(Api_url.state.GET_ALL);
}
