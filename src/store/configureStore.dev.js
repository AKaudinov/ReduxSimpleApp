//function will be called at the application entry point so the store is configured as the app starts up

import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'; //middleware for the store
import thunk from 'redux-thunk';

export default function configureStore(initialState){
    return createStore(rootReducer, initialState, compose(
        applyMiddleware(thunk, reduxImmutableStateInvariant()),
        window.devToolsExtension ? window.devToolsExtension() : f => f//can supply middleware via commas, in parameters, as many as we need.
    ));
}
//
//let store = createStore(reducer, initialState, compose(
//    applyMiddleware(...middleware),
//    window.devToolsExtension ? window.devToolsExtension() : f => f
//));