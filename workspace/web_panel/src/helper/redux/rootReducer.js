import {combineReducers} from "redux";
import {authReducer} from "./reducers/authReducer";
import {i18nReducer} from "./reducers/i18nReducer";
import {builderReducer} from "./reducers/builderReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    i18n: i18nReducer,
    builder: builderReducer,
});
