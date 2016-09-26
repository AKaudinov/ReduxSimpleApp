import expect from 'expect';
import {authorsFormattedForDropDown} from './selectors';

describe('Author Selectors', () => {
   describe('authorsFormattedForDropDown', () => { //nest the describe calls
       it('should return author data formatted for use in a dropdown', () => {
            const authors = [
               {id: 'cory-house', firstName: 'Cory', lastName: 'House'},
               {id: 'scott-allen', firstName: 'Scott',lastName:'Allen'}
           ];

           const expected = [
               {value: 'cory-house', text: 'Cory House'},
               {value: 'scott-allen', text:'Scott Allen'}
           ];

           expect(authorsFormattedForDropDown(authors)).toEqual(expected);
       });
   });
});