import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function placePersonnel_ByPlace(data) {
    return axios.get(Api_url.PlacePersonel.PersonnelByPlace,{params: data});
}
