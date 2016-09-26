import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

describe('Course Reducer', () =>{
    it('should add course when passed CREATE_COURSE_SUCCESS', () =>{
        //arrange
        const initialState = [
            {title: 'A'},
            {title: 'B'}
        ];

        const newCourse = {title: 'C'};

        const action = actions.createCourseSuccess(newCourse);

        //Act
        const newState = courseReducer(initialState, action);

        //assert
        expect(newState.length).toEqual(3);
        expect(newState[0].title).toEqual('A'); //first object in the array should have a title of 'A'
        expect(newState[1].title).toEqual('B');
        expect(newState[2].title).toEqual('C');
    });

    it('should update course when passed UPDATE_COURSE_SUCCESS', () =>{
        //arrange
        const initialState = [
            {id: 'A', title: 'A'},
            {id: 'B', title: 'B'},
            {id: 'C', title: 'C'}
        ];

        const course = {id: 'B', title: 'Da Title'};
        const action = actions.updateCourseSuccess(course);

        //Act
        const newState = courseReducer(initialState, action); //update the state
        const updatedCourse = newState.find(c => c.id == course.id);
        const untouchedCourse = newState.find(c => c.id == 'A');

        //assert
        expect(updatedCourse.title).toEqual('Da Title'); //assert the new title of the course
        expect(untouchedCourse.title).toEqual('A'); //assert the untouched course
        expect(newState.length).toEqual(3); //make sure the length of state is still 3
    });
});