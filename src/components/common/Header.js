import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';

//IndexLink from React component, used to navigate to the index page, or the initial page.
//activeClassName says, If the link is active, apply that class.
//{" | "} simple pipe layout
const Header = ({loading, numOfCourses}) => {
    return (
        <div>
            <div className="navbar navbar-inverse">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li>
                            <IndexLink to="/" activeClassName="active">Home</IndexLink>
                        </li>
                        <li>
                            <Link to="/courses" activeClassName="active">Courses</Link>
                        </li>
                        <li>
                            <Link to="/about" activeClassName="active">About{loading && <LoadingDots interval={100} dots={20}/>}</Link>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a href="#">Courses Present: {numOfCourses}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

Header.propTypes = {
    loading: PropTypes.bool.isRequired,
    numOfCourses: PropTypes.number.isRequired
};

export default Header;