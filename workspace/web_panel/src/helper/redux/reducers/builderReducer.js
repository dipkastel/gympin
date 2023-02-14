import {persistReducer} from "redux-persist";
import MenuConfig from "../../configs/MenuConfig";
import LayoutConfig from "../../configs/LayoutConfig";
import storage from "redux-persist/lib/storage";
import {builderActionTypes} from "../actions/builderAction";

const initialState = {
    menuConfig: MenuConfig,
    layoutConfig: LayoutConfig,
    htmlClassServiceObjects: undefined,
};

export const builderReducer = persistReducer(
    {
        storage,
        key: "build-demo1",
        blacklist: ["htmlClassServiceObjects"],
    },
    (state = initialState, { type, payload }) => {
        switch (type) {
            case builderActionTypes.SetMenuConfig:
                return { ...state, menuConfig: payload };

            case builderActionTypes.SetLayoutConfigs:
                return { ...state, layoutConfig: payload };

            case builderActionTypes.SetLayoutConfigsWithPageRefresh: {
                return { ...state, layoutConfig: payload };
            }
            case builderActionTypes.SetHtmlClassService:
                return { ...state, htmlClassServiceObjects: payload };

            default:
                return state;
        }
    }
);
