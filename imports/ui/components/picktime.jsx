import React from 'react';
import TimePicker from 'material-ui/TimePicker';

export default class PickTime extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value24: null
    };
    this.handleChangeTimePicker24 = this.handleChangeTimePicker24.bind(this);
  }

  handleChangeTimePicker24(time) {
    console.log(time);
    this.setState(
      {
        value24: time,
      }
    );
  };

  render() {
    return (
      <div>
          <TimePicker
            format="24hr"
            hintText="24hr Format"
            value={this.state.value24}
            onChange={(time) => this.handleChangeTimePicker24(time)}
            minutesStep={5}
          />
      </div>
    );
  }
}