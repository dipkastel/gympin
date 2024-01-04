import axios from "axios";
import { MultimediaApi } from "./const_api";


export function media_addImage(data) {
  return axios.post(MultimediaApi.add, data, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
}
export function media_query(data) {
  return axios.post(MultimediaApi.query, data);
}
export function media_getAllImages(data) {
  return axios.get(MultimediaApi.getAllImages, { params: data });
}

export function media_delete(data) {
  return axios.put(MultimediaApi.delete,  data );
}
