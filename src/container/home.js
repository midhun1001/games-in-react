import React, { Component } from 'react';
import { Link } from 'react-router';

class Home extends Component {
  render() {
    return (
      <nav className="navbar navbar2">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/single">Single Player</Link>
            <Link to="/multi">Multiplayer Player</Link>
          </div>
        </div>
      </nav>
    )
  }
}

export default Home;
