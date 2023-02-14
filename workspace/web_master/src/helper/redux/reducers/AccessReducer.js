import {persistReducer} from "redux-persist";
import {accessActionTypes} from "../actions/AccessActions";
import storage from "redux-persist/lib/storage";


const initialAccessState = {
    access:undefined
};

const ReducerConfig = {
    storage,
    key: "gympin-master-access",
    whitelist:["access"]
};

const AccessReducer = (state = initialAccessState, action) => {
    switch (action.type) {
        case accessActionTypes.SetAccess: {
            return {...state,access: action.payload.access};
        }
        default:
            return state;
    }
}

export const accessReducer = persistReducer(ReducerConfig, AccessReducer);
