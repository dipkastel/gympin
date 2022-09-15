import { put, takeLatest } from "redux-saga/effects";
import {authActionTypes} from "../actions/authActionTypes";
import {authActions} from "../actions/authActions";



export function* saga() {
    // yield takeLatest(authActionTypes.Login, function* loginSaga() {
    //     console.log("loginSaga");
    //     yield put(authActions.requestUser());
    // });

    yield takeLatest(authActionTypes.Register, function* registerSaga() {
        console.log("registerSaga");
        yield put(authActions.requestUser());
    });

    yield takeLatest(authActionTypes.UserRequested, function* userRequested() {
        console.log("userRequested saga");
        const a = {
            status: 200,
            data: {

            }
        };
        yield put(authActions.fulfillUser(a));
    });
}
