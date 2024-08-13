export function getHomeId(settings) {
    try {
        var userSetting = settings?.settings?.server.UserSettings.find(s => s.Key === "PLACE_HOME_PAGE_ID").Value
        if(userSetting&&userSetting!="") return userSetting;
        var publicSettings = settings.settings.server.Settings.find(s => s.Key === "WEB_MASTER_HOMEPAGE_ID").Value;
        if(publicSettings&&publicSettings!="") return publicSettings;
        return 2;
    } catch (e) {
        return 2
    }
}
