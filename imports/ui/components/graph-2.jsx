import React from 'react';
import Select from 'react-select';
import Chart2 from './chart2.jsx';

class Graph2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            yearSelected: new Date().getFullYear(),
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        require('react-select/dist/react-select.css');
    }

    handleChange(selectedOption) {
        this.setState({ yearSelected: selectedOption.value });
    }

    render() {
        const listYears = [
            {value: 2017, label: 2017},
            {value: 2018, label: 2018}
            ];
        return (
            <div>
                <Select
                    name="year selected"
                    value={this.state.yearSelected}
                    onChange={this.handleChange}
                    options={listYears}
                />
                <Chart2  yearSelected={this.state.yearSelected} />
            </div>
        );
    }
}
export default Graph2;
