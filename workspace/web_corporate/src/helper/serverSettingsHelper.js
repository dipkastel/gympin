import axios from "axios";
import {Api_url} from "../network/api/NETWORKCONSTS";

export function getHomeId(serverSettings) {
    try{
        return serverSettings.find(s=>s.Key==="WEB_CORPORATE_HOMEPAGE_ID").Value;
    }catch (e) {
        return 2
    }
}
