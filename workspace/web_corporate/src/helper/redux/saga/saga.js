import {call, put, takeLatest} from "redux-saga/effects";
import {authActions} from "../actions/AuthActions";
import {ActionTypesSaga} from "../actions/SagaActions"
import {user_getById} from "../../../network/api/user.api";
import {corporateActions} from "../actions/CorporateActions";
import {configs_getCorporateSplash} from "../../../network/api/configs.api";
import {settingActions} from "../actions/SettingsActions";
import store from "../store";
import {corporate_getById} from "../../../network/api/corporate.api";


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
        const result = yield call(
            () => new Promise((resolve) => {
                corporate_getById(action.payload.corporate.Id).then((_result) => {
                    resolve(_result.data.Data);
                }).catch(e => {
                    console.log(e)
                });
            })
        );
        yield put(corporateActions.SetCorporate(result));
    });

    yield takeLatest(ActionTypesSaga.RequestServerSettings, function* settingRequested(action) {

        const result = yield call(
            () => new Promise((resolve) => {
                configs_getCorporateSplash({UserId:action.payload.user.Id}).then((_result) => {
                    resolve(_result.data.Data);
                }).catch(e => {
                    console.log(e)
                });
            })
        );
        yield put(settingActions.SetServerSettings(result));
    });


    yield takeLatest(ActionTypesSaga.RequestLogout, function* logoutRequested(action) {
        try{store.dispatch(settingActions.SetServerSettings(undefined));}catch (e) {}
        try{store.dispatch(settingActions.SetAppSettings(undefined));}catch (e) {}
        try{store.dispatch(corporateActions.SetCorporate(undefined));}catch (e) {}
        try{store.dispatch(authActions.Logout());}catch (e) {}

    });
}
