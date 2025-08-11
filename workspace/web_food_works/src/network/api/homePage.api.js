import axios from "axios";
import { Api_url } from "./NETWORKCONSTS";

export function HomePage_getHome(data) {
  return axios.get(Api_url.homePage.GET_HOME_PAGE, { params: data });
}
