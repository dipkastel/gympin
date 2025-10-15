import {call, put, takeLatest} from "redux-saga/effects";
import {authActions} from "../actions/AuthActions";
import {ActionTypesSaga} from "../actions/SagaActions";
import {cateringActions} from "../actions/CateringActions";
import {settingActions} from "../actions/SettingsActions";
import store from "../store";
import {Catering_getById} from "../../../network/api/catering.api";
import {configs_getCateringSplash} from "../../../network/api/configs.api";

export function* saga() {
    yield takeLatest(
        ActionTypesSaga.RequestUser,
        function* userRequested(action) {
            var result = [];
            yield call(
                () =>
                    new Promise((resolve) => {
                        // user_getById(action.payload.user.Id)
                        //   .then((_result) => {
                        //     result = _result.data.Data;
                        //     resolve(_result.data.Data);
                        //   })
                        //   .catch((e) => {
                        //     console.log(e);
                        //   });
                    }),
            );
            yield put(authActions.SetUser(result));
        },
    );
    yield takeLatest(
        ActionTypesSaga.RequestCatering,
        function* cateringRequested(action) {
            const result = yield call(
                () =>
                    new Promise((resolve) => {
                        Catering_getById({id: action?.payload?.catering?.Id})
                            .then((_result) => {
                                console.log("Get =====", action?.payload?.catering?.Id)
                                resolve(_result.data.Data);
                            })
                            .catch((e) => {
                                console.log(e);
                            });
                    }),
            );
            yield put(cateringActions.SetCatering(result));
        },
    );

    yield takeLatest(
        ActionTypesSaga.RequestServerSettings,
        function* settingRequested(action) {
            const result = yield call(
                () =>
                    new Promise((resolve) => {
                        configs_getCateringSplash({UserId: action.payload.user.Id})
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
                store.dispatch(cateringActions.SetCatering(undefined));
            } catch (e) {
            }
            try {
                store.dispatch(authActions.Logout());
            } catch (e) {
            }
        },
    );
}
