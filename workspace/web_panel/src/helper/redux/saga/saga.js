import {call, put, takeLatest} from "redux-saga/effects";
import {authActions} from "../actions/authActions";
import {user_getById} from "../../../network/api/user.api";
import {ActionTypesSaga} from "../actions/SagaActions";

export function* authSaga() {
    yield takeLatest(ActionTypesSaga.RequestUser, function* userRequested(action) {
        console.log(action.payload.user.Id);
        const result = yield call(
            () => new Promise((resolve) => {
                user_getById(action.payload.user.Id).then((_result) => {
                    console.log(_result)
                    resolve(_result.data.Data);
                }).catch(e => {
                    console.log(e)
                });
            })
        );
        yield put(authActions.SetUser(result));
    });
}
