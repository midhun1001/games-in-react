import React from 'react';
import { Row, Col } from 'react-materialize';
import './Navbar.scss';

const logo = require('../../../public/games_icon.png');

const NAVBAR = () => (
  <header>
    <Row>
      <Col s={12}>
        <img src={logo} alt="Logo" />
      </Col>
    </Row>
  </header>
);

export default NAVBAR;
