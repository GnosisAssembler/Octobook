import { GET_ERRORS } from '../actions/types';

// Initial state of the reducer
const initialState = {};

/*
    Arguments:
    1. Initial state of the reducer
    2. action. (despatch actions to this reducer)

*/
export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ERRORS:
            return action.payload;
        default:
            return state;
    }
}