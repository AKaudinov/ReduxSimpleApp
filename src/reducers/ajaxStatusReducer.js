import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(actionType){
    return actionType.substring(actionType.length - 8) == '_SUCCESS'; //to know when an ajax call ends
}

//some simple reducers can have if statement instead of the switch statement
export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action){
    if(action.type == actionTypes.BEGIN_AJAX_CALL){
        return state + 1;
    }else if(action.type == actionTypes.AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type)){
        return state - 1;
    }
    return state;
}