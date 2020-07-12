import { takeLatest, put, call, all } from 'redux-saga/effects';
import {
  EDIT_LOCATION_REQUEST,
  EDIT_LOCATION_SUCCESS,
  EDIT_LOCATION_FAILURE,
  GET_LOCATIONS_REQUEST
} from '../constants';

import * as api from '../services';

function* editLocationWalker(action) {
  try {
    yield call(api.editLocation, action.payload);
    yield all([
        put({
            type: EDIT_LOCATION_SUCCESS,
        }),
        put({
            type: GET_LOCATIONS_REQUEST,
        })
    ])
  } catch (error) {
    yield put({
        type: EDIT_LOCATION_FAILURE,
        payload: error
    })
  }
}

export function* editLocationWatcherSaga() {
  yield takeLatest(EDIT_LOCATION_REQUEST, editLocationWalker);
}
