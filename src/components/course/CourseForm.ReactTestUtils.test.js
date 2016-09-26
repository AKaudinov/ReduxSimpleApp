import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';

function setup(saving){
    let props = {
        course: {},
        saving: saving,
        errors: {},
        onSave: () => {},
        onChange: () => {}
    };
    let renderer = TestUtils.createRenderer(); //instance of react test utils renderer
    renderer.render(<CourseForm {...props}/>); //render the course form, use the spread operator to type the props one by one
    let output = renderer.getRenderOutput(); //get the render output

    return {
        props,
        output,
        renderer
    };
}

//label the tests
describe('CourseForm via React Test utils', () => {
    //describe what you're trying to test
    it('render from an h1', () => {
        const{output} = setup(); //get the output of the course form render
        expect(output.type).toBe('form');
        let [h1] = output.props.children; //the first element after form is h1
        expect(h1.type).toBe('h1'); //h1 should be h1
    });

    it('save button is labeled "save" when not saving', () => {
       const {output} = setup(false); //parameter false
        const submitButton = output.props.children[5]; //get the 6th child, arrays are zero based
        expect(submitButton.props.value).toBe('Save');
    });

    it('save button is labled "Saving..." when saving', () => {
       const {output} = setup(true); //parameter saving is true
        const submitButton = output.props.children[5];
        expect(submitButton.props.value).toBe('Saving...');
    });
});