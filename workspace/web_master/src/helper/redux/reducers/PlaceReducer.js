import {persistReducer} from "redux-persist";
import {placeActionTypes} from "../actions/PlaceActions";
import storage from "redux-persist/lib/storage";


const initialPlaceState = {
    place:undefined,
    gates:undefined,
};

const ReducerConfig = {
    storage,
    key: "gympin-master-place",
    whitelist:["place","gates"]
};

const PlaceReducer = (state = initialPlaceState, action) => {
    switch (action.type) {
        case placeActionTypes.SetPlace: {
            return {...state,place: action.payload.place};
        }
        case placeActionTypes.SetGates: {
            return {...state ,gates: action.payload.gates};
        }
        default:
            return state;
    }
}

export const placeReducer = persistReducer(ReducerConfig, PlaceReducer);
