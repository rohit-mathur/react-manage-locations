import * as actionType from './../constants';

export const requestLocations = () => ({
    type: actionType.GET_LOCATIONS_REQUEST
})

export const deleteLocation = (location) => ({
    type: actionType.DELETE_LOCATION_REQUEST,
    payload: location
})

export const addLocation = (reqObj) => ({
    type: actionType.ADD_LOCATION_REQUEST,
    payload: reqObj
})

export const editLocation = (reqObj) => ({
    type: actionType.EDIT_LOCATION_REQUEST,
    payload: reqObj
})

export const getLocationDetail = (location) => ({
    type: actionType.GET_LOCATION_DETAILS_REQUEST,
    payload: location
})