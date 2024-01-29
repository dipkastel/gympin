import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


//sport
export function sport_getAll(param) {
    return axios.get(Api_url.Sport.getAll,{params:param});
}
