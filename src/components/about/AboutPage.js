import React from 'react';
//There is some limitation in hot-reloading where some stateless function components don't hot-reload unless they have
//a parent class based component


class AboutPage extends React.Component {
    render(){
        return(
          <div>
              <h1>About</h1>
              <p>This application uses React, Redux, React Router and a variety of other awesome libraries.</p>
          </div>
        );
    }
}

export default AboutPage;