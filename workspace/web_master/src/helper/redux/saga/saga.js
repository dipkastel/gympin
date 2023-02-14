import {call, put, takeLatest} from "redux-saga/effects";
import {authActions} from "../actions/AuthActions";
import {ActionTypesSaga, sagaActions} from "../actions/SagaActions"
import {user_getById} from "../../../network/api/user.api";
import {place_getById} from "../../../network/api/place.api";
import {placeActions} from "../actions/PlaceActions";
import {Gates_getByPlace} from "../../../network/api/gates.api";
import {placePersonnel_getAccess} from "../../../network/api/placePersonnel.api";
import {accessActions} from "../actions/AccessActions";
import {select} from "@redux-saga/core/effects";


export const getUser = (state)=> state.auth.user;
export const getPlace = (state)=> state.place.place;

export function* saga() {
    //
    // yield takeLatest(authActionTypes., function* loginSaga(action,payload) {
    //     console.log("requestUserPlace saga");
    //     yield put(ActionsSaga.sagaRequestUser(action.payload.user));
    // });

    yield takeLatest(ActionTypesSaga.RequestUser, function* userRequested(action) {
        const result = yield call(
            () => new Promise((resolve) => {
                user_getById(action.payload.user.Id).then((_result) => {
                    resolve(_result.data.Data);
                }).catch(e => {
                    console.log(e)
                });
            })
        );
        const place =yield select(getPlace);
        if(place)
            yield put(sagaActions.RequestAccess(result.Id,place.Id));
        yield put(authActions.SetUser(result));
    });
    yield takeLatest(ActionTypesSaga.RequestPlace, function* placeRequested(action) {
        const result = yield call(
            () => new Promise((resolve) => {
                place_getById(action.payload.placeId).then((_result) => {
                    resolve(_result.data.Data);
                }).catch(e => {
                    console.log(e)
                });
            })
        );
        const user =yield select(getUser);
        if(user)
            yield put(sagaActions.RequestAccess(user.Id,result.Id));
        yield put(placeActions.SetPlace(result));
    });

    yield takeLatest(ActionTypesSaga.RequestAccess, function* accessRequested(action) {
        const result = yield call(
            () => new Promise((resolve) => {
                console.log("hehehehehe");
                placePersonnel_getAccess({
                    placeId: action.payload.placeId,
                    userId: action.payload.userId
                }).then((_result) => {
                    resolve(_result.data.Data);
                }).catch(e => {
                    console.log(e)
                });
            })
        );
        yield put(accessActions.SetAccess(result));
    });

    yield takeLatest(ActionTypesSaga.RequestGates, function* gatesRequested(action) {
        const result = yield call(
            () => new Promise((resolve) => {
                Gates_getByPlace({Id: action.payload.place.Id}).then((_result) => {
                    resolve(_result.data.Data);
                }).catch(e => {
                    console.log(e)
                });
            })
        );
        yield put(placeActions.SetGates(result));
    });

}
