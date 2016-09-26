import React from 'react';
import {Link} from 'react-router'; //Link component from react router uses <Link></Link> anchor tags

class HomePage extends React.Component {
    render() {
        return (
                <div className="jumbotron">
                    <h1>The Course Administration</h1>
                    <p>React, Redux and React Router in ES6 for the most awesome ultra-responsive web apps.</p>
                    <Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
                </div>
        );
    }
}

export default HomePage; //import {HomePage} from Homepage, possible because you export default here.