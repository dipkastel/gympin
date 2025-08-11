import { combineReducers } from "redux";
import { authReducer } from "./reducers/authReducer";
import { settingsReducer } from "./reducers/settingsReducer";
import { cateringReducer } from "./reducers/CateringReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  catering: cateringReducer,
  settings: settingsReducer,
});
