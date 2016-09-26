//this file will track the status of the ajax calls
import * as actionTypes from './actionTypes';

export function beginAjaxCall(){
    return {type: actionTypes.BEGIN_AJAX_CALL};
}

export function ajaxCallError(){
    return {type: actionTypes.AJAX_CALL_ERROR};
}