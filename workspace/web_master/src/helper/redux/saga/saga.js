import {call, put, takeLatest} from "redux-saga/effects";
import {authActions} from "../actions/authActions";
import {ActionTypesSaga} from "../actions/SagaActions";
import {user_getById} from "../../../network/api/user.api";
import {placeActions} from "../actions/PlaceActions";
import {configs_getWebMasterSplash} from "../../../network/api/configs.api";
import {settingActions} from "../actions/SettingsActions";
import store from "../store";
import { place_getMyPlaceById} from "../../../network/api/corporate.api";

export function* saga() {
    yield takeLatest(
        ActionTypesSaga.RequestUser,
        function* userRequested(action) {
            var result = [];
            yield call(
                () =>
                    new Promise((resolve) => {
                        user_getById(action.payload.user?.Id)
                            .then((_result) => {
                                result = _result.data.Data;
                                resolve(_result.data.Data);
                            })
                            .catch((e) => {
                                console.log(e);
                            });
                    }),
            );
            yield put(authActions.SetUser(result));
        },
    );
    yield takeLatest(
        ActionTypesSaga.RequestPlace,
        function* placeRequested(action) {
            const result = yield call(
                () =>
                    new Promise((resolve) => {
                        place_getMyPlaceById(action.payload.place?.Id)
                            .then((_result) => {
                                resolve(_result.data.Data);
                            })
                            .catch((e) => {
                                console.log(e);
                            });
                    }),
            );
            yield put(placeActions.SetPlace(result));
        },
    );

    yield takeLatest(
        ActionTypesSaga.RequestServerSettings,
        function* settingRequested(action) {
            const result = yield call(
                () =>
                    new Promise((resolve) => {
                        configs_getWebMasterSplash({UserId: action.payload.user?.Id})
                            .then((_result) => {
                                resolve(_result.data.Data);
                            })
                            .catch((e) => {
                                console.log(e);
                            });
                    }),
            );
            yield put(settingActions.SetServerSettings(result));
        },
    );

    yield takeLatest(
        ActionTypesSaga.RequestLogout,
        function* logoutRequested(action) {
            try {
                store.dispatch(settingActions.SetServerSettings(undefined));
            } catch (e) {
            }
            try {
                store.dispatch(settingActions.SetAppSettings(undefined));
            } catch (e) {
            }
            try {
                store.dispatch(placeActions.SetPlace(undefined));
            } catch (e) {
            }
            try {
                store.dispatch(authActions.Logout());
            } catch (e) {
            }
        },
    );
}

