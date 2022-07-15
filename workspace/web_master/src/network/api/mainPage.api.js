import axios from "axios";
import {Account} from "../const/NETWORKCONSTS";

export function getMainPage() {
    return axios.get(Account.LOGIN_URL);
}
