import {combineReducers} from 'redux';
import courses from './courseReducer'; //Since the export is default inside the courseReducer file, you can
//alias the import statement however you want.
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    courses, //shortHand property name
    //This property affects the way you call the state, ex: state.courses instead of state.courseReducer
    authors,
    ajaxCallsInProgress
});

export default rootReducer;