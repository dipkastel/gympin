export const i18nActionTypes = {
    SetLanguage: "i18n/SET_LANGUAGE",
};

export const i18nActions = {
    setLanguage: (lang) => ({type: i18nActionTypes.SetLanguage, payload: {lang}}),
};
