import React from 'react';
import DatePicker from 'material-ui/DatePicker';

export default class PickDate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            controlledDate: null,
        };
    }

    handleChange = (event, date) => {
        this.setState({
            controlledDate: date,
        });
    };

    render() {
      console.log(this.state.controlledDate);
        return (
            <DatePicker
                hintText="Date Input"
                value={this.state.controlledDate}
                onChange={this.handleChange}
            />
        );
    }
}