import axios from "axios";
import {Api_url} from "../const/NETWORKCONSTS";

export function getMainPage() {
    return axios.get(Api_url.mainPage.GET_MAIN_PAGE,{params:{id:2}});
}
