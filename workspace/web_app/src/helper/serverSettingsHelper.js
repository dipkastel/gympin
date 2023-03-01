export function getHomeId(serverSettings) {
    try{
        return serverSettings.find(s=>s.Key==="WEBAPP_HOMEPAGE_ID").Value;
    }catch (e) {
        return 2
    }
}
