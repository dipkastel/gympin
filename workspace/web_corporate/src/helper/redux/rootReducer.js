import {combineReducers} from "redux";
import {authReducer} from "./reducers/authReducer";
import {settingsReducer} from "./reducers/settingsReducer";
import {corporateReducer} from "./reducers/corporateReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    corporate: corporateReducer,
    settings: settingsReducer,
});
