import { takeLatest, put, call, all } from 'redux-saga/effects';
import {
  ADD_LOCATION_REQUEST,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_FAILURE,
  GET_LOCATIONS_REQUEST
} from '../constants';

import * as api from '../services';

function* addLocationWalker(action) {
  try {
    yield call(api.addLocation, action.payload);
    yield all([
        put({
            type: ADD_LOCATION_SUCCESS,
        }),
        put({
            type: GET_LOCATIONS_REQUEST,
        })
    ])
  } catch (error) {
    yield put({
        type: ADD_LOCATION_FAILURE,
        payload: error
    })
  }
}

export function* addLocationWatcherSaga() {
  yield takeLatest(ADD_LOCATION_REQUEST, addLocationWalker);
}
