export function getHomeId(settings) {
    try {
        return settings.settings.server.Settings.find(s => s.Key === "WEB_MASTER_HOMEPAGE_ID").Value;
    } catch (e) {
        return 2
    }
}
