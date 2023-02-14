import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {i18nActionTypes} from "../actions/i18nActions";

const initialState = {
    lang: "fa",
};

export const i18nReducer = persistReducer(
    { storage, key: "i18n" },
    (state = initialState, action) => {
        switch (action.type) {
            case i18nActionTypes.SetLanguage:
                return { ...state, lang: action.payload.lang };

            default:
                return state;
        }
    }
);
