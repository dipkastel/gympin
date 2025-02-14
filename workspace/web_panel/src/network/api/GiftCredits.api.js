import axios from "axios";
import {giftCreditApi, PlacePersonelApi} from "./const_api";

//gift
export function GiftCredit_query(data) {
    return axios.post(giftCreditApi.query, data);
}

export function GiftCredit_add(data) {
    return axios.post(giftCreditApi.add, data);
}
