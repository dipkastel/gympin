
export const settingsActionTypes = {
    SetServerSettings: "[settings] server settings",
    SetAppSettings: "[settings] server settings"
};

export const settingActions = {
    SetServerSettings: (settings) => ({ type: settingsActionTypes.SetServerSettings, payload: { settings } }),
    SetAppSettings: (settings) => ({ type: settingsActionTypes.SetAppSettings, payload: { settings } }),
};