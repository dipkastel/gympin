import { combineReducers } from "redux";
import { authReducer } from "./reducers/authReducer";
import { settingsReducer } from "./reducers/settingsReducer";
import { placeReducer } from "./reducers/placeReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  place: placeReducer,
  settings: settingsReducer,
});

