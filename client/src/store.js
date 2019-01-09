// (compose for redux chrome extension)
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// Bring in the reducers
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

/* Initialize store for Redux' Provider, which holds the complete state tree of the app 
    Arguments:
    1.reducer (Function): A reducing function that returns the next state tree, given the 
        current state tree and an action to handle.
    2.[preloadedState] (any): The initial state. 
    3.[enhancer] (Function): The store enhancer. 
*/ 
const store = createStore( 
    rootReducer, 
    initialState, 
    // for redux chrome extension
    compose (
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    );

export default store;