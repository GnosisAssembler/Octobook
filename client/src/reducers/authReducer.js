import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';

// Initial state of the reducer
const initialState = {
    isAuthedicated: false,
    user: {}
}

/*
    Arguments:
    1. Initial state of the reducer
    2. action. (despatch actions to this reducer)

*/
export default function(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return{
                ...state,
                isAuthedicated: !isEmpty(action.payload),
                user: action.payload
            };
        default:
            return state;
    }
}