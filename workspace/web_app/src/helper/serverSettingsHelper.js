export function getHomeId(settings) {
    try{
        var userSetting = settings?.settings?.server?.UserSettings?.find(s => s.Key === "WEB_HOME_PAGE_ID")?.Value
        if(userSetting&&userSetting!="") return userSetting;
        var publicSettings = settings?.settings?.server?.Settings?.find(s => s.Key === "WEB_APP_HOMEPAGE_ID")?.Value;
        if(publicSettings&&publicSettings!="") return publicSettings;
        return 2;
    }catch (e) {
        return 2
    }
}

export function getUserCanOrderFood(settings) {
    try{
        return !!settings?.settings?.server?.UserSettings?.some(s => s.Key ==="CATERING_ACCESS")
    }catch (e) {
        return false
    }
}

export function getUserCateringsAvailable(settings) {
    try{
        return settings?.settings?.server?.UserSettings?.filter(s => s.Key ==="CATERING_ACCESS");
    }catch (e) {
        return false
    }
}

export function getCheckoutType(settings){
    try{
        var userSetting = settings?.settings?.server?.UserSettings?.find(s => s.Key === "USER_CHECKOUT_TYPE")?.Value
        if(userSetting&&userSetting!="") return userSetting;
        var publicSettings = settings?.settings?.server?.Settings?.find(s => s.Key === "WEB_APP_CHECKOUT_TYPE")?.Value;
        if(publicSettings&&publicSettings!="") return publicSettings;
    }catch (e) {
    }
}
export function getBuyForOtherSupport(settings){
    try {
        var userSetting = settings?.settings?.server?.UserCorporateSettings
        var result = userSetting[Object.keys(userSetting)[0]][0].Value=="true"
        if(!result)
            return Object.keys(userSetting)[0];
        else
            return false;

    }catch (e){
        return false
    }
}

export function getIncredibleTime(settings) {
    try {
        var publicSettings = settings?.settings?.server?.Settings?.find(
            (s) => s.Key === "TICKET_INCREDIBLES_INTERVAL",
        )?.Value;
        if (publicSettings && publicSettings != "") return Number(publicSettings);
        return 50;
    } catch (e) {
        return 49;
    }
}

