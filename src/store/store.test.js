import expect from 'expect';
import {createStore} from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('Store', () =>{
   it('Should handle creating courses', ()=>{
      //Arrange
       const store = createStore(rootReducer, initialState);
       const course = {
           title: "Clean Code"
       };

       //Act
       const action = courseActions.createCourseSuccess(course);
       store.dispatch(action);
       //could dispatch multiple actions here and assert on result

       //assert
       const actual = store.getState().courses[0]; //get the whole state, and grab just the first course
       const expected = {
         title: "Clean Code"
       };

       expect(actual).toEqual(expected);
   });
});