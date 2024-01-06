export function getHomeId(serverSettings) {
    try{
        return serverSettings.settings.server.Settings.find(s=>s.Key==="WEB_APP_HOMEPAGE_ID").Value;
    }catch (e) {
        return 2
    }
}
