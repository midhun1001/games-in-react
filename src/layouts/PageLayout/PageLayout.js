import React from 'react';
import PropTypes from 'prop-types';
import NAVBAR from '../Navbar/Navbar';

const PageLayout = ({ children }) => (
  <div style={{ height: '100%' }}>
    <NAVBAR />
    <div className="page-content">
      { children }
    </div>
  </div>
);

PageLayout.propTypes = {
  children: PropTypes.node
};
PageLayout.defaultProps = {
  children: {}
};

export default PageLayout;
