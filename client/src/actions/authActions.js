import { GET_ERRORS } from './types';
// Import axios
import axios from 'axios';

// Register User
export const registerUser = (userData, history) => dispatch => {
    // Make request to back end api whish is returning a json-like user
    axios.post('/api/users/register', userData)
        .then(res => history.push('/login') ) // redirect to login page
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );

};