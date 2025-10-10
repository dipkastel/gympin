import {call, put, takeLatest} from "redux-saga/effects";
import {authActions} from "../actions/authActions";
import {ActionTypesSaga, sagaActions} from "../actions/SagaActions"
import {user_getById, user_getMyInfo} from "../../../network/api/user.api";
import {configs_getWebAppSplash} from "../../../network/api/configs.api";
import {settingActions} from "../actions/SettingsActions";
import store from "../store";
import {invoiceActions} from "../actions/InvoiceActions";
import {invoice_query} from "../../../network/api/invoice.api";


export function* saga() {
    yield takeLatest(ActionTypesSaga.RequestUser, function* userRequested(action) {

        const result = yield call(
            () => new Promise((resolve) => {
                user_getMyInfo().then((_result) => {
                    if(_result.data.Data.UserStatus!="ENABLED"){
                        try{store.dispatch(authActions.Logout());}catch (e) {}
                    }
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
                configs_getWebAppSplash({UserId:action.payload.user.Id}).then((_result) => {
                    resolve(_result.data.Data);
                }).catch(e => {
                    console.log(e)
                });
            })
        );
        yield put(settingActions.SetServerSettings(result));
    });
    yield takeLatest(ActionTypesSaga.RequestUserInvoices, function* InvoicesRequested(action) {
        const result = yield call(
            () => new Promise((resolve) => {
                invoice_query({
                    queryType: "FILTER",
                    UserId:action.payload.user.Id,
                    paging:{Page:0,Size:100}
                }).then((_result) => {
                    resolve(_result.data.Data);
                }).catch(e => {
                    console.log(e)
                });
            })
        );

        yield put(invoiceActions.SetInvoices(result?.content?.filter(i=>i.Status!="DRAFT")));
        yield put(invoiceActions.SetUserBasket(result?.content?.filter(i=>i.Status=="DRAFT")?.[0]));
    });
    yield takeLatest(ActionTypesSaga.RequestLogout, function* logoutRequested(action) {
        try{store.dispatch(settingActions.SetServerSettings(undefined));}catch (e) {}
        try{store.dispatch(settingActions.SetAppSettings(undefined));}catch (e) {}
        try{store.dispatch(invoiceActions.SetInvoices(undefined));}catch (e) {}
        try{store.dispatch(invoiceActions.SetUserBasket(undefined));}catch (e) {}
        try{store.dispatch(authActions.Logout());}catch (e) {}
    });

}
