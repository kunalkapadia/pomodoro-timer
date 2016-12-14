import React, { Component } from 'react';
import Counter from './components/Counter';
import Pomodoro from './components/Pomodoro';

class App extends Component {
  constructor () {
    super();
    this.state = {
      breakLength: 5 * 60, // 5 mins
      sessionLength: 30 * 60, // 30 mins
      currentActivityTimeLeft: 30 * 60, // 30 mins
      currentActivityType: 'session',
      isPomodoroActive: false
    };
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  _canUpdateValue (activityType) {
    return this.state.isPomodoroActive === false ||
      this.state.currentActivityType === activityType
  }

  handleIncrement (activityType) {
    if (this._canUpdateValue(activityType)) {
      if (activityType === 'session') {
        this.setState(prevState => ({
          sessionLength: prevState.sessionLength + 1 * 60
        }));
        if (this.state.currentActivityType === activityType) {
          this.setState(prevState => ({
            currentActivityTimeLeft: prevState.sessionLength
          }));
        }
      } else if (activityType === 'break') {
        this.setState(prevState => ({
          breakLength: prevState.breakLength + 1 * 60
        }));
        if (this.state.currentActivityType === activityType) {
          this.setState(prevState => ({
            currentActivityTimeLeft: prevState.breakLength
          }));
        }
      }

      this._handleStop();
    }
  }

  handleDecrement (activityType) {
    if (this._canUpdateValue(activityType)) {
      if (activityType === 'session' && this.state.sessionLength > 1 * 60) {
        this.setState(prevState => ({
          sessionLength: prevState.sessionLength - 1 * 60
        }));
        if (this.state.currentActivityType === activityType) {
          this.setState(prevState => ({
            currentActivityTimeLeft: prevState.sessionLength
          }));
        }
      } else if (activityType === 'break' && this.state.breakLength > 1 * 60) {
        this.setState(prevState => ({
          breakLength: prevState.breakLength - 1 * 60
        }));
        if (this.state.currentActivityType === activityType) {
          this.setState(prevState => ({
            currentActivityTimeLeft: prevState.breakLength
          }));
        }
      }

      this._handleStop();
    }
  }

  _handleStart () {
    this._interval = setInterval(() => {
      this.setState(prevState => ({
        currentActivityTimeLeft: prevState.currentActivityTimeLeft - 1
      }));
      if (this.state.currentActivityTimeLeft === 0) {
        this.setState(prevState => ({
          currentActivityType: (prevState.currentActivityType === 'session' ? 'break' : 'session'),
          currentActivityTimeLeft: (prevState.currentActivityType === 'session') ? prevState.breakLength : prevState.sessionLength
        }))
      }
    }, 1000);
    this.setState({
      isPomodoroActive: true
    });
  }

  _handleStop () {
    if (this._interval) {
      clearInterval(this._interval)
    }
    this.setState({
      isPomodoroActive: false
    });
  }

  handleClick () {
    if (this.state.isPomodoroActive) {
      this._handleStop()
    } else {
      this._handleStart()
    }
  }

  render () {
    return (
      <div className="text-center">
        <h1>Pomodoro Timer</h1>
        <div className="row" style={{marginTop: "18px"}}>
          <div className="col-sm-3 col-sm-offset-3">
            <Counter
              title="Break Length"
              value={this.state.breakLength/60}
              handleIncrement={this.handleIncrement.bind(this, 'break')}
              handleDecrement={this.handleDecrement.bind(this, 'break')}
            />
          </div>
          <div className="col-sm-3">
            <Counter
              title="Session Length"
              value={this.state.sessionLength/60}
              handleIncrement={this.handleIncrement.bind(this, 'session')}
              handleDecrement={this.handleDecrement.bind(this, 'session')}
            />
          </div>
        </div>
        <div className="row">
          <Pomodoro
            currentActivityTimeLeft={this.state.currentActivityTimeLeft}
            currentActivityType={this.state.currentActivityType}
            handleClick={this.handleClick}
          />
        </div>
      </div>
    );
  }
}

export default App;
