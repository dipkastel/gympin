import { combineReducers } from "redux";
import { authReducer } from "./reducers/authReducer";
import { settingsReducer } from "./reducers/SettingsReducer";
import { placeReducer } from "./reducers/PlaceReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    place: placeReducer,
    settings: settingsReducer,
});
