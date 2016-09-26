//function will be called at the application entry point so the store is configured as the app starts up

import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

export default function configureStore(initialState){
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk) //can supply middleware via commas, in parameters, as many as we need.
    );
}