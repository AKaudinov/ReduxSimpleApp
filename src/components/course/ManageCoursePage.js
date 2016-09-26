import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import {authorsFormattedForDropDown} from '../../selectors/selectors';
import toastr from 'toastr';



//export the managerCoursePage component
export class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);
        //set up local state


        //if the state first loads an empty course array, any changes to props after that like
        // reloading of the page will not persist the new props to this local state
        //a component called 'componentWillReceiveProps' can come in handy for these situations.
        this.state = {
            course: Object.assign({}, this.props.course), //you can omit the this keyword since it is already in the constructor
            errors: {},
            saving: false
        };
        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }


    componentWillReceiveProps(nextProps){
        if(this.props.course.id != nextProps.course.id){
            //Necessary to populate form when existing course is loaded directly.
            this.setState({course: Object.assign({}, nextProps.course)});
        }
    }

    //componentDidMount(){
    //    this.context.router.setRouteLeaveHook(this.props.route, ()=> {
    //        if(this.state.course !== this.props.course){
    //            return 'You wanna leave?'
    //        }
    //    })
    //}

    updateCourseState(event){
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        return this.setState({course:course});
    }

    courseFormIsValid(){
        let formIsValid = true;
        let errors = {};

        if(this.state.course.title.length < 5){
            errors.title = 'Title must be at least 5 characters.';
            formIsValid = false;
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    saveCourse(event){
        event.preventDefault();

        if(!this.courseFormIsValid()){
            return;
        }

        this.setState({saving: true});
        this.props.actions.saveCourse(this.state.course)
        .then(() => this.redirect())
        .catch(error => {
           toastr.error(error);
            this.setState({saving: false});
        });
    }

    redirect(){
        this.setState({saving: false});
        toastr.options = {
            positionClass: 'toast-bottom-center',
            preventDuplicates: false,
            progressBar: true
        };
        toastr.success('Course saved');
        this.context.router.push('/courses'); //will change the url back to courses
    }

    render() {
        return (
            //wrap the course form in the div, as only one top level element is allowed., if there is no top level element, div is not required.
            <CourseForm
                allAuthors={this.props.authors}
                onChange={this.updateCourseState}
                onSave={this.saveCourse}
                course={this.state.course}
                errors={this.state.errors}
                saving={this.state.saving}
            />
        );
    }
}


ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

//Pull in React Router context so router is available in this.context.router
ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function getCourseById(courses, id){
    const course = courses.filter(course => course.id == id); //filter returns an array, so we have to grab the first object.
    //since there should only be one
    if(course.length){
        return course[0];
    }
    return null;
}


//ownProps is a reference to the components props, which means you're able to access routing related props
function mapStateToProps(state, ownProps) {
    const courseId = ownProps.params.id; //from the path'/course/:id'

    let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

    if(courseId && state.courses.length > 0){ //make sure at least one course exists, since this runs asynchrenously and doesn't wait for api
        //to finish
        course = getCourseById(state.courses, courseId);
    }

    return {
        course: course,
        authors: authorsFormattedForDropDown(state.authors)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
