import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function PlaceRate_AddRate(data) {
    return axios.post(Api_url.placeRate.add,data);
}

export function PlaceComment_AddComment(data) {
    return axios.post(Api_url.placeComment.add,data);
}

export function PlaceComment_query(data) {
    return axios.post(Api_url.placeComment.query,data);
}
