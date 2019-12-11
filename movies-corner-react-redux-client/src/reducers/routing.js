import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = { locationBeforeTransitions: null };

export default function(state = initialState, action) {
    const{type} = action;

    switch (type) {
        case LOCATION_CHANGE:
            return {
                ...state,
                locationBeforeTransitions: action.payload
            };
        default:
            return state;
    }
}