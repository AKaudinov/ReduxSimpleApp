//This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';

class App extends React.Component {
    render(){
        return (
            <div className="container-fluid">
                <Header
                    loading={this.props.loading}
                    numOfCourses={this.props.courses.length}/>
                {this.props.children}
            </div>
        );
    }
}

//React Router passes in "children" components as properties to this.props.children

//proptype validation
App.propTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    courses: PropTypes.array.isRequired
};

//pass down the loading status to the header
function mapStateToProps(state, ownProps){
    return {
      loading: state.ajaxCallsInProgress > 0,
        courses: state.courses
    };
}

export default connect(mapStateToProps)(App);