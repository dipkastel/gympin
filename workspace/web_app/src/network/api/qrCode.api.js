import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function qrCode_getCode(data) {
    return axios.post(Api_url.qrCode.getCode, data);
}
