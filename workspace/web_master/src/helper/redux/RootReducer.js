import {combineReducers} from "redux";
import {authReducer} from "./reducers/authReducer";
import {settingsReducer} from "./reducers/SettingsReducer";
import {placeReducer} from "./reducers/PlaceReducer";
import {accessReducer} from "./reducers/AccessReducer";




export const rootReducer = combineReducers({
    auth: authReducer,
    settings:settingsReducer,
    place:placeReducer,
    access:accessReducer
});
