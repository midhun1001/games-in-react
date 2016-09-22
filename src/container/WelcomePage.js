import React, {Component} from 'react';
import { Link } from 'react-router';

class WelcomePage extends Component {
  render(){
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/home" className='navbar-brand'>Snake and Ladder</Link>
            </div>
          </div>
        </nav>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
}

export default WelcomePage;
