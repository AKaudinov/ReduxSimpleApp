import AuthorApi from '../api/mockAuthorApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadAuthorsSuccess(authors){
    return{type:types.LOAD_AUTHORS_SUCCESS, authors};
}

export function loadAuthors(){
    return dispatch => {
        //you can dispatch this action in your mock api or real api so you don't have to do this every time you make an api call
        //in the actions
        //However this allows doing optimistic api calls, for example deleting will be instant, even though the ajax call is still
        //in progress
        dispatch(beginAjaxCall());
        return AuthorApi.getAllAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error => {
            throw(error);
        });
    };
}