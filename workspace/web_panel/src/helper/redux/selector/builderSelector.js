import objectPath from "object-path";

export const builderSelectors = {
    getClasses: (store, params) => {
        const { htmlClassServiceObjects } = store.builder;

        return htmlClassServiceObjects
            ? htmlClassServiceObjects.getClasses(params.path, params.toString)
            : "";
    },
    getAttributes: (store, params) => {
        if (params.path) {
            // if path is specified, get the value within object
            const { htmlClassServiceObjects } = store.builder;

            return htmlClassServiceObjects
                ? htmlClassServiceObjects.getAttributes(params.path)
                : [];
        }

        return [];
    },
    getConfig: (state, path) => {
        const { layoutConfig } = state.builder;

        if (path) {
            // if path is specified, get the value within object
            return objectPath.get(layoutConfig, path);
        }

        return "";
    },

    getLogo: ({ builder: { layoutConfig } }) => {
        const menuAsideLeftSkin = objectPath.get(layoutConfig, "brand.self.skin");
        // set brand logo
        const logoObject = objectPath.get(layoutConfig, "self.logo");
        let logo;
        if (typeof logoObject === "string") {
            logo = logoObject;
        }

        if (typeof logoObject === "object") {
            logo = objectPath.get(logoObject, menuAsideLeftSkin + "");
        }

        if (typeof logo === "undefined") {
            try {
                const logos = objectPath.get(this.layoutConfig, "self.logo");
                logo = logos[Object.keys(logos)[0]];
            } catch (e) {}
        }
        return logo;
    },

    getStickyLogo: (store) => {
        const { layoutConfig } = store.builder;
        let logo = objectPath.get(layoutConfig, "self.logo.sticky");
        if (typeof logo === "undefined") {
            logo = builderSelectors.getLogo(store);
        }
        return logo + "";
    },
};
