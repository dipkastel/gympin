import {persistReducer} from "redux-persist";
import {settingsActionTypes} from "../../../helper/redux/actions/SettingsActions";
import storage from "redux-persist/lib/storage";
import {invoiceActionTypes} from "../actions/InvoiceActions";


const initialInvoiceState = {
    basket: undefined,
    invoices: undefined
};

const ReducerConfig = {
    storage,
    key: "gympin-pwa-invocie",
    whitelist:["basket","invoices"]
};

const InvoiceReducer = (state = initialInvoiceState, action) => {
    switch (action.type) {
        case invoiceActionTypes.SetInvoices: {
            return {...state,invoices: action.payload.invoices};
        }
        case invoiceActionTypes.SetUserBasket: {
            return {...state,userBasket: action.payload.invoices};
        }
        default:
            return state;
    }
}

export const invoiceReducer = persistReducer(ReducerConfig, InvoiceReducer);
