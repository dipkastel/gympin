import axios from "axios";
import {PlaceApi, SportApi, UserCreditApi} from "./const_api";

//userCredit
export function UserCredit_getByUser(data) {
    return axios.get(UserCreditApi.getByUser,{params:data});
}
