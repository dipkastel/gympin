import axios from "axios";
import {Api_url} from "../network/api/NETWORKCONSTS";

export function getHomeId(settings) {
    try{
        return settings.serverSettings.find(s=>s.Key==="WEB_MASTER_HOMEPAGE_ID").Value;
    }catch (e) {
        return 1
    }
}
