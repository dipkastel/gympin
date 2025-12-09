import axios from "axios";
import {giftCreditApi, TagApi} from "./const_api";

//gift
export function GiftCredit_query(data) {
    return axios.post(giftCreditApi.query, data);
}

export function GiftCredit_add(data) {
    return axios.post(giftCreditApi.add, data);
}

export function GiftCredit_update(data) {
    return axios.put(giftCreditApi.update, data);
}
export function GiftCredit_delete(data) {
    return axios.put(giftCreditApi.delete,  data );
}
