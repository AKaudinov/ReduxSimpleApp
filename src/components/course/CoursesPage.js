import React, {PropTypes} from 'react';
import {connect} from 'react-redux'; //function connects this container component to the Redux store
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';


//es6 classes don't bind automatically with the 'this' context
class CoursesPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    }

    //older way
    //    onClickSave(){
    //      this.props.dispatch(courseActions.createCourse(this.state.course));
    // }

    //courseRow(course, index){
    //    return <div key={index}>{course.title}</div>;
    //}

    redirectToAddCoursePage() {          //browser history is required here, it will add the new linkto url to the array
        browserHistory.push('/course');
    }

    render() {
        const {courses} = this.props; //distructure
        return (
            <div>
                <h1>Courses</h1>
                <input type="submit"
                       value="Add Course"
                       className="btn btn-primary"
                       onClick={this.redirectToAddCoursePage}/>
                <CourseList courses={courses}/>
            </div>
        );
    }
}

//prop type validation
CoursesPage.propTypes = {
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired
};

//redux connect and related functions
function mapStateToProps(state, ownProps) { //ownProps lets us access props that are attached to this component, reference
    //to the components' own props.
    return {
        courses: state.courses//this property is determined by the choice made in the reducer(rootReducer)
    };
}

//must wrap actions in the dispatch function, this function makes it possible for the flow of action to continue
//Once you have created and passed the mapDispatchToProps function to the connect function, connect function will not
//make the dispatch property available to your component
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch) //will find all actions in courseActions, and map them to dispatch
        //so your component will have access to all of them
        //you could however specify one single action in the bindActionCreators like so: (courseActions.createCourse,..)
        // old way: createCourse: course => dispatch(courseActions.createCourse(course))
    };
}


//Alternative call
//const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
//export default connectedStateAndProps(CoursesPage);


export default  connect(mapStateToProps, mapDispatchToProps)(CoursesPage); //connect function wraps the courses page.
//connect function returns a function, that function then immediately executes with the CoursesPage
//as a parameter

//if no second parameter is passed in to the connect function, it adds a dispatch property to your component,
//you're then able to dispatch your actions in the component: this.props.dispatch