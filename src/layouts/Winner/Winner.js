import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-materialize';
import './Winner.scss';

const fire2 = require('../../../public/fire2.gif');

const Winner = (props) => {
  const resetGame = () => {
    props.reset();
  };
  const congtzMsg = () => {
    console.log(props);
    if (props.winner) {
      return (
        `Congratulations to ${props.winner}`
      );
    } else if (props.fail) {
      return (
        'You hanged!!'
      );
    }
    return (
      'Congratulations!!'
    );
  };
  return (
    <div>
      <div className="overlay" />
      <div className="winner">
        {
          !props.fail &&
          <img src={fire2} alt="Fire Work" />
        }
        <span>{congtzMsg()}</span>
        <Button waves="green" onClick={() => resetGame()}>Start Again</Button>
      </div>
    </div>
  );
};

Winner.propTypes = {
  winner: PropTypes.string,
  reset: PropTypes.func,
  fail: PropTypes.bool
};

export default Winner;
