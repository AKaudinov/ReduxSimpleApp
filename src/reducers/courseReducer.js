import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action){
    let coursesResult = [];
    switch(action.type){
        case actionTypes.LOAD_COURSES_SUCCESS:
            coursesResult = action.courses;
            break;
            //return [...state, Object.assign({}, action.course)];
            case actionTypes.CREATE_COURSE_SUCCESS:
                coursesResult =  [
                    ...state,
                    Object.assign({}, action.course)//spread the array ...state,
                    // new instance of the array with the copied objects from the state array,
                    //add a new object via object.assign, by passing in the action.course into it
                ];
            break;
        case actionTypes.UPDATE_COURSE_SUCCESS:
            debugger;
            coursesResult = [
              ...state.filter(course => course.id !== action.course.id), //get the list of all course except the one being updated,
                //and then insert the new course into that list in order to update it.
                Object.assign({}, action.course)
            ];
            break;
        default:
            return state;
    }
    return coursesResult.sort((a, b) =>{
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
    });
}