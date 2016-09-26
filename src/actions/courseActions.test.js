import expect from 'expect';
import * as courseActions from './courseActions';
import * as actionTypes from './actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

//Test a sync action
describe('Course Actions', () =>{
   describe('createCourseSuccess', () =>{
      it('should create a CREATE_COURSE_SUCCESS action', () => {
        //arrange the the details
          const course = {id: 'clean-code', title:'Clean Code'};
          const expectedAction = {
                type: actionTypes.CREATE_COURSE_SUCCESS,
                course: course
          };

          //Act
          const action = courseActions.createCourseSuccess(course);

          //assert
          expect(action).toEqual(expectedAction);
      });
   });
});

const middleware = [thunk]; //middleware is an array
const mockStore = configureMockStore(middleware) //mockStore takes middleWare, we have thunk as middleware

describe('Async Actions', () =>{
   afterEach(() => {
     nock.cleanAll();  //important with nock after each call, nock cleans up after each test is run
   });
                                                                    //callback done function when async work is complete
    it('should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses', (done)=>{
        ////would call nock
        //nock('http://example.com/') //actual api, nock would capture it and return a fake response below
        //.get('/courses')
        //.reply(200, {body: {courses: [{id: 1, firstname: 'Cory', lastName: 'House'}] }});

        //arrange
        const expectedActions = [
            {type: actionTypes.BEGIN_AJAX_CALL},
            {type: actionTypes.LOAD_COURSES_SUCCESS, body: {courses: [{id: 'clean-code', title: 'Clean Code'}] }}
        ];

        const store = mockStore({courses: []}, expectedActions); //call the mock store with initial state and actions we're expecting
        store.dispatch(courseActions.loadCourses()).then(() => {
           const actions = store.getActions(); //get the list of actions
            expect(actions[0].type).toEqual(actionTypes.BEGIN_AJAX_CALL); //assert first action
            expect(actions[1].type).toEqual(actionTypes.LOAD_COURSES_SUCCESS); //assert second action
            done();
            //callback defined above that tells Mocha async work is complete

            //this test will be slow because no real api mocking is used, and the actual delay function is in use,
            //which is currently set to 1 second
        });
    });
});