import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme'; //named imports
import TestUtils from 'react-addons-test-utils'; //react addons test utils is utilized by Enzyme, but it doesn't actually need to
//be explicitly imported here.
import CourseForm from './CourseForm';

function setup(saving){
    const props = {
        course: {},
        saving: saving,
        errors: {},
        onSave: () => {},
        onChange: () => {}
    };

    return shallow(<CourseForm {...props} />); //call shallow and pass the component with props
}

describe('CourseForm via Enzyme', () => {


it('renders form and h1', () => {
   const wrapper = setup(false); //wrapper component from the setup call
    expect(wrapper.find('form').length).toBe(1); //find only one form, length 1
    expect(wrapper.find('h1').text()).toEqual('Manage Course'); //find the text of h1 and it should be Manage Course
});

it('save button is labeled "Save" when not saving', () => {
   const wrapper = setup(false); //saving false
    expect(wrapper.find('input').props().value).toBe('Save'); //find the button with the value Save
});

it('save buttons is labeled "Saving..." when saving', () => {
   const wrapper = setup(true); //saving true
    expect(wrapper.find('input').props().value).toBe('Saving...'); //find the button input with the value of Saving...
});
});