import React from 'react';
import Select from 'react-select';
import Chart2 from './chart2.jsx';

class Graph1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            yearSelected: 2017,
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
            {value: 2018, label: 2018},
            {value: 2019, label: 2019},
            {value: 2020, label: 2020},
            ];
        return (
            <div>
                <Select
                    name="year selected"
                    value={this.state.year}
                    onChange={this.handleChange}
                    options={listYears}
                />
                <Chart2  yearSelected={this.state.yearSelected} />
            </div>
        );
    }
}
export default Graph1;
