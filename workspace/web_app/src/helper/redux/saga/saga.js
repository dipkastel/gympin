import { put, takeLatest } from "redux-saga/effects";
import {authActionTypes} from "../actions/authActionTypes";
import {authActions} from "../actions/authActions";
import {call} from "redux-saga/effects"
import {getUserById} from "../../../network/api/user.api";


export function* saga() {

    yield takeLatest(authActionTypes.SagaUserRequested, function* userRequested() {
        console.log("UserRequested")

        const result = yield call(
            () => new Promise((resolve) => {
                getUserById(55).then((_result) => {
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
