import { takeLatest, put, call, all } from 'redux-saga/effects';
import {
    DELETE_LOCATION_REQUEST,
    DELETE_LOCATION_SUCCESS,
    DELETE_LOCATION_FAILURE,
    GET_LOCATIONS_REQUEST
} from '../constants';

import * as api from '../services';

function* deleteLocationWalker(action) {
    try {
        yield call(api.deleteLocation, action.payload);
        yield all([
            put({
                type: DELETE_LOCATION_SUCCESS
            }),
            put({
                type: GET_LOCATIONS_REQUEST
            })
        ])
    } catch (error) {
        yield put({
            type: DELETE_LOCATION_FAILURE,
            payload: error
        })
    }
}

export function* deleteLocationWatcherSaga() {
    yield takeLatest(DELETE_LOCATION_REQUEST, deleteLocationWalker);
}
