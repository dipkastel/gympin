import {persistReducer} from "redux-persist";
import {placeActionTypes} from "../actions/PlaceActions";
import storage from "redux-persist/lib/storage";


const initialPlaceState = {
    place:undefined,
    halls:undefined,
};

const ReducerConfig = {
    storage,
    key: "gympin-master-place",
    whitelist:["place","halls"]
};

const PlaceReducer = (state = initialPlaceState, action) => {
    switch (action.type) {
        case placeActionTypes.SetPlace: {
            return {...state,place: action.payload.place};
        }
        case placeActionTypes.SetHalls: {
            return {...state ,halls: action.payload.halls};
        }
        default:
            return state;
    }
}

export const placeReducer = persistReducer(ReducerConfig, PlaceReducer);
