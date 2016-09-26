/*eslint-disable import/default*/ //since configureStore.js no longer exports default. and eslint watches for that
import 'babel-polyfill'; //babel can't transpile certain es6 features(50k minified)
import React from 'react';
import {render} from 'react-dom'; //react-dom is split of from react
import configureStore from './store/configureStore';
import {Provider} from 'react-redux'; //Provider is the higher order component that attaches the store to the Container Components
import {Router, browserHistory} from 'react-router'; //Router component , browserHistory gives nice clean urls
import routes from './routes'; //routes.js file gets passed in as a prop as well to the Router component
import {loadCourses} from './actions/courseActions'; //< named import {}
import {loadAuthors} from './actions/authorActions';
import './styles/styles.css'; //Webpack can import css files too and bundle them too.
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootswatch/flatly/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';


//reducer sets the initial state with its default parameter you don't have to set it in here.
//if initial state is passed right now, it would override the initial state default parameter in the reducer
//localStore or state passed from the server can be passed down here however
const store = configureStore(); // Once the store is configured, we can dispatch actions against the store.
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

render(
    //Provider component takes the store as the parameter, and then just wraps the main Router component inside it.
    //The Provider component is wrapping the entire application
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);