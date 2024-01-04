import {combineReducers} from "redux";
import {authReducer} from "./reducers/authReducer";
import {settingsReducer} from "./reducers/settingsReducer";
import {invoiceReducer} from "./reducers/invoiceReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    invoice: invoiceReducer,
    settings:settingsReducer,
});
