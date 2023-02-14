import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {corporateActionTypes} from "../actions/CorporateActions";


const initialPlaceState = {
    corporate:undefined,
};

const ReducerConfig = {
    storage,
    key: "gympin-corporate-corporate",
    whitelist:["corporate"]
};

const Reducer = (state = initialPlaceState, action) => {
    switch (action.type) {
        case corporateActionTypes.SetCorporate: {
            return {...state,corporate: action.payload.corporate};
        }
        default:
            return state;
    }
}

export const corporateReducer = persistReducer(ReducerConfig, Reducer);
