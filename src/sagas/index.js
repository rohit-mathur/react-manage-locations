import { all } from 'redux-saga/effects';
import { getLocationsWatcherSaga, getLocationDetailWatcherSaga } from './saga.getLocations';
import { deleteLocationWatcherSaga } from './saga.deleteLocation';
import { addLocationWatcherSaga } from './saga.addLocation';
import { editLocationWatcherSaga } from './saga.editLocation';

export default function* root() {
    yield all([
        getLocationsWatcherSaga(),
        deleteLocationWatcherSaga(),
        addLocationWatcherSaga(),
        editLocationWatcherSaga(),
        getLocationDetailWatcherSaga()
    ]);
}
