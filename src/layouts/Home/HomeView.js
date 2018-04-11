import React from 'react';
import { Link } from 'react-router';
import { Row, Col } from 'react-materialize';
import './HomeView.scss';

const sal = require('../../../public/sal.png');
const hngman = require('../../../public/hangman.png');

const HomeView = () => (
  <main className="home">
    <Row>
      <Col s={4}>
        <Link to="sal" className="home__col">
          <h4>Snake and Ladder</h4>
          <img src={sal} alt="Snake and Ladder" />
        </Link>
      </Col>
      <Col s={4}>
        <Link to="hangman" className="home__col">
          <h4>Hangman</h4>
          <img src={hngman} alt="Snake and Ladder" />
        </Link>
      </Col>
    </Row>
  </main>
);


export default HomeView;
