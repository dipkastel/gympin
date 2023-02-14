import {call, put, takeLatest} from "redux-saga/effects";
import {authActions} from "../actions/AuthActions";
import {ActionTypesSaga} from "../actions/SagaActions"
import {user_getById} from "../../../network/api/user.api";
import {corporate_getById} from "../../../network/api/corporate.api";
import {corporateActions} from "../actions/CorporateActions";


export function* saga() {
    yield takeLatest(ActionTypesSaga.RequestUser, function* userRequested(action) {
        var result = [];
        yield call(
            () => new Promise((resolve) => {
                user_getById(action.payload.user.Id).then((_result) => {
                    result = _result.data.Data;
                    resolve(_result.data.Data);
                }).catch(e => {
                    console.log(e)
                });
            })
        );
        yield put(authActions.SetUser(result));
    });
    yield takeLatest(ActionTypesSaga.RequestCorporate, function* corporateRequested(action) {
        console.log(action.payload.corporate.Id);
        const result = yield call(
            () => new Promise((resolve) => {
                corporate_getById(action.payload.corporate.Id).then((_result) => {
                    console.log(_result)
                    resolve(_result.data.Data);
                }).catch(e => {
                    console.log(e)
                });
            })
        );
        yield put(corporateActions.SetCorporate(result));
    });

}
