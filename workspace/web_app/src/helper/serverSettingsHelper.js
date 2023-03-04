export function getHomeId(serverSettings) {
    try{
        console.log(serverSettings)
        return serverSettings.settings.server.Settings.find(s=>s.Key==="WEB_APP_HOMEPAGE_ID").Value;
    }catch (e) {
        return 2
    }
}
