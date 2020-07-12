import { takeLatest, put, call } from 'redux-saga/effects';
import {
  GET_LOCATIONS_REQUEST,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_FAILURE,
  GET_LOCATION_DETAILS_REQUEST,
  GET_LOCATION_DETAILS_SUCCESS,
  GET_LOCATION_DETAILS_FAILURE
} from '../constants';

import * as api from '../services';

function* getLocationsWalker(action) {
  try {
    const result = yield call(api.getLocations);
    yield put({
        type: GET_LOCATIONS_SUCCESS,
        payload: result
    })
  } catch (error) {
    yield put({
        type: GET_LOCATIONS_FAILURE,
        payload: error
    })
  }
}

export function* getLocationsWatcherSaga() {
  yield takeLatest(GET_LOCATIONS_REQUEST, getLocationsWalker);
}

function* getLocationDetailWalker(action) {
  try {
    const result = yield call(api.getLocationDetail, action.payload);
    yield put({
        type: GET_LOCATION_DETAILS_SUCCESS,
        payload: result
    })
  } catch (error) {
    yield put({
        type: GET_LOCATION_DETAILS_FAILURE,
        payload: error
    })
  }
}

export function* getLocationDetailWatcherSaga() {
  yield takeLatest(GET_LOCATION_DETAILS_REQUEST, getLocationDetailWalker);
}