import React, { PropTypes } from 'react';

const Counter = (props) => {
  // convert props.value to minutes and seconds
  return (
    <div className="counter">
      <div> {props.title.toUpperCase()} </div>
      <div>
        <button className="btn btn-link" onClick={props.handleDecrement}>
          <span className="glyphicon glyphicon-minus"/>
        </button>
        <span className="counter-value"> { props.value } </span>
        <button className="btn btn-link" onClick={props.handleIncrement}>
          <span className="glyphicon glyphicon-plus"/>
        </button>
      </div>
    </div>
  );
};

Counter.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  handleIncrement: PropTypes.func.isRequired,
  handleDecrement: PropTypes.func.isRequired
};

export default Counter;