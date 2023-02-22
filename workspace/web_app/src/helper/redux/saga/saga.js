import {call, put, takeLatest} from "redux-saga/effects";
import {authActions} from "../actions/authActions";
import {ActionTypesSaga} from "../actions/SagaActions"
import {user_getById} from "../../../network/api/user.api";


export function* saga() {
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
        yield put(authActions.SetUser(result));
    });

}
