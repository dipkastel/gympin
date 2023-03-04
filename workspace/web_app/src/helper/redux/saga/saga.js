import {call, put, takeLatest} from "redux-saga/effects";
import {authActions} from "../actions/authActions";
import {ActionTypesSaga} from "../actions/SagaActions"
import {user_getById} from "../../../network/api/user.api";
import {configs_getWebAppSplash} from "../../../network/api/configs.api";
import {settingActions} from "../actions/SettingsActions";


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

    yield takeLatest(ActionTypesSaga.RequestServerSettings, function* settingRequested(action) {

        const result = yield call(
            () => new Promise((resolve) => {
                configs_getWebAppSplash(action.payload.user.Id).then((_result) => {
                    resolve(_result.data.Data);
                }).catch(e => {
                    console.log(e)
                });
            })
        );
        yield put(settingActions.SetServerSettings(result));
    });

}
