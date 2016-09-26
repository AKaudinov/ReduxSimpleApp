import * as actionTypes from './actionTypes';
import courseApi from '../api/mockCourseApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadCoursesSuccess(courses){
    return {type: actionTypes.LOAD_COURSES_SUCCESS, courses}; //can also use course: course, but if the right hand side matches left hand side
    //you can omit it
}

export function createCourseSuccess(course){
    return {type: actionTypes.CREATE_COURSE_SUCCESS, course};
}

export function updateCourseSuccess(course){
    return {type: actionTypes.UPDATE_COURSE_SUCCESS, course};
}

//thunk functions must return a function that accepts a dispatch
export function loadCourses(){
    return function(dispatch){
        dispatch(beginAjaxCall());
        return courseApi.getAllCourses()
        .then(courses => {
            dispatch(loadCoursesSuccess(courses));
        }).catch(error => {
               throw(error);
        });
    };
}

export function saveCourse(course){
    return function(dispatch, getState){
        dispatch(beginAjaxCall());
        return courseApi.saveCourse(course).then(savedCourse => {
            course.id ? dispatch(updateCourseSuccess(savedCourse)) : dispatch(createCourseSuccess(savedCourse));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}