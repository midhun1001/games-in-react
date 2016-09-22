import React, { Component } from 'react';
import { connect } from 'react-redux';
import WelcomePage from './WelcomePage';
class App extends Component {
  render () {
    return (
      <div>
        <WelcomePage {...this.props}/>
      </div>
    )
  }
}
function mapStatetoProps(store) {
  return store;
}
export default connect(mapStatetoProps)(App);
