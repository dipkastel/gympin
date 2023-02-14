import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function media_AddImage(data) {
    return axios.post(Api_url.multimedia.add,data,{
        headers: {
            "Content-Type": "multipart/form-data",
        },});
}
