import axios from "axios";
import {Api_url} from "../network/api/NETWORKCONSTS";

export function getHomeId(settings) {
    try{
        console.log(settings?.settings?.server)
        var userSetting = settings?.settings?.server?.UserSettings?.find(s => s.Key === "CORPORATE_HOME_PAGE_ID")?.Value
        if(userSetting&&userSetting!="") return userSetting;
        var publicSettings = settings?.settings?.server?.Settings?.find(s => s.Key === "WEB_CORPORATE_HOMEPAGE_ID")?.Value;
        if(publicSettings&&publicSettings!="") return publicSettings;
        return 2;
    }catch (e) {
        return 2
    }
}
