import * as actionType from './../constants'
const defaultState = {
    loading: false,
    locations: []
};


const locationReducer = (state = defaultState, action) => {
    switch (action.type) {

        case actionType.GET_LOCATIONS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case actionType.GET_LOCATIONS_SUCCESS:
            return {
                ...state,
                locations: action.payload,
                loading: false
            }

        case actionType.GET_LOCATIONS_FAILURE:
            return {
                ...state,
                loading: false
            }

        case actionType.ADD_LOCATION_REQUEST:
            return {
                ...state,
                loading: true
            }

        case actionType.ADD_LOCATION_SUCCESS:
            return {
                ...state,
                loading: false
            }

        case actionType.ADD_LOCATION_FAILURE: 
            return {
                ...state,
                loading: false
            }
        
        case actionType.DELETE_LOCATION_REQUEST: 
            return {
                ...state,
                loading: true
            }
        
        case actionType.GET_LOCATION_DETAILS_SUCCESS:
            return {
                ...state,
                locationDetail: action.payload
            }

        default:
            return state;
    }
}

export default locationReducer;