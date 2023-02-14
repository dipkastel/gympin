import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export function UserCredit_getByUser(data) {
    return axios.get(Api_url.userCredit.getByUser,{params:data});
}
