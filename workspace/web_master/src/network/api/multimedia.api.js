import axios from "axios";
import {Api_url} from "../const/NETWORKCONSTS";

export function multimediaAddImage(file) {
    return axios.post(Api_url.multimedia.add,{MediaType:"IMAGE",multipartFile:file},{
        headers: {
            "Content-Type": "multipart/form-data",
        },});
}
