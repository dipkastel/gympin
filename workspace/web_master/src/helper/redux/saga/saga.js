import { call,put, takeLatest } from "redux-saga/effects";
import {authActionTypes, authActionTypesSaga} from "../actions/authActionTypes";
import {authActions, authActionsSaga} from "../actions/authActions";
import {getMyPlace} from "../../../network/api/place.api";
import {getUserById} from "../../../network/api/user.api";





export function* saga() {

    yield takeLatest(authActionTypes.Login, function* loginSaga(action,payload) {
        console.log("requestUserPlace saga");
        yield put(authActionsSaga.sagaRequestUser(action.payload.user));
    });

    yield takeLatest(authActionTypesSaga.SagaUserRequested, function* userRequested(action) {
        console.log(action.payload.user.Id);
        const result = yield call(
            () => new Promise((resolve) => {
                getUserById(action.payload.user.Id).then((_result) => {
                    console.log(_result)
                    resolve(_result.data.Data);
                }).catch(e=>{
                    console.log(e)
                });
            })
        );
        yield put(authActions.userLoaded(result));
    });

}
