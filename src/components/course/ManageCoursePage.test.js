import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import {ManageCoursePage} from './ManageCoursePage';
        //named import to reference just ManageCoursePage class and not the connected class

describe('Manage Course Page', () =>{
   it('sets error message when trying to save empty tittle', () =>{
       const props = {
           authors: [],
           actions: {saveCourse: ()=> {return Promise.resolve(); }},
           course:{id: '', watchHref: '', title: '', authorId: '', length: '', category: ''}
       };
     //provider wrap useful for testing such as mapStateToProps that are related to the redux connections
       // const wrapper = mount(<Provider store ={store}><ManageCoursePage/></Provider>;
       const wrapper = mount(<ManageCoursePage {...props}/>); //shallow only renders one layer deep, mount renders all the child components as well
        const saveButton = wrapper.find('input').last(); //last input of the form, which is the button
       expect(saveButton.prop('type')).toBe('submit');
       saveButton.simulate('click');
       expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
   });
});