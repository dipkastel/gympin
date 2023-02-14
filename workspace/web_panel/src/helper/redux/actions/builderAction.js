export const builderActionTypes = {
    SetMenuConfig: "builder/SET_MENU_CONFIG",
    SetLayoutConfigs: "builder/SET_LAYOUT_CONFIGS",
    SetLayoutConfigsWithPageRefresh:
        "builder/SET_LAYOUT_CONFIGS_WITH_PAGE_REFRESH",
    SetHtmlClassService: "builder/SET_HTML_CLASS_SERVICE",
};


export const builderActions = {
    setMenuConfig: (payload) => ({payload, type: builderActionTypes.SetMenuConfig}),

    setLayoutConfigs: (payload) => ({
        payload,
        type: builderActionTypes.SetLayoutConfigs,
    }),

    setLayoutConfigsWithPageRefresh: (payload) => ({
        payload,
        type: builderActionTypes.SetLayoutConfigsWithPageRefresh,
    }),

    setHtmlClassService: (payload) => ({
        payload,
        type: builderActionTypes.SetHtmlClassService,
    }),
};
