import React from 'react';
import TimePicker from 'material-ui/TimePicker';

export default class PickTime extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value24: null};
    }

    handleChangeTimePicker24 = (event, date) => {
        this.setState({value24: date});
    };


    render() {
        return (
            <div>
                <TimePicker
                    format="24hr"
                    hintText="24hr Format"
                    value={this.state.value24}
                    onChange={this.handleChangeTimePicker24}
                    minutesStep={5}
                />
            </div>
        );
    }
}