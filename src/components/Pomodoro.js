import React, {PropTypes} from 'react';

class Pomodoro extends React.Component {
  render () {
    const minutes = parseInt(this.props.currentActivityTimeLeft / 60, 10);
    const seconds = this.props.currentActivityTimeLeft % 60;

    let message;
    if (this.props.currentActivityType === 'session') {
      message = 'Session';
    } else {
      message = 'Break!';
    }
    return (
      <div className="pomodoro-clock" onClick={this.props.handleClick}>
        <div> { message } </div>
        <div> { minutes } : { seconds } </div>
      </div>
    )
  }
}

Pomodoro.propTypes = {
  currentActivityTimeLeft: PropTypes.number.isRequired,
  currentActivityType: PropTypes.string.isRequired,
  isPomodoroActive: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default Pomodoro;
