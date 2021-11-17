import axios from "axios";
import {MultimediaApi, UserApi} from "./const_api";
//media
export function media_getAll(data) {
    return axios.get(MultimediaApi.getAllByType,{params:data});
}
export function media_addMedia(data) {
    return axios.post(MultimediaApi.add,{data:data},{
        headers:{
            'content-type': 'multipart/form-data'
        }
    });
}
