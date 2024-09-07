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
export function getCheckoutType(settings){
    try{
        var userSetting = settings?.settings?.server?.UserSettings?.find(s => s.Key === "USER_CHECKOUT_TYPE")?.Value
        if(userSetting&&userSetting!="") return userSetting;
        var publicSettings = settings?.settings?.server?.Settings?.find(s => s.Key === "WEB_APP_CHECKOUT_TYPE")?.Value;
        if(publicSettings&&publicSettings!="") return publicSettings;
    }catch (e) {
    }
}
