import React from 'react';
import Select from 'react-select';
import Chart1 from './chart3.jsx';

class Graph1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            options: [],
            year: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        //on recupere les entreprises depuis le parent et on l'injecte dans le state
        const options = [];
        this.props.options.map((company) => {
            options.push({value: company._id, label: company.name})
        });
        this.setState({
            options,
            query: options[0].value, // valeur par defaut
            year: 2017, //valeur par défaut
        });
    }

    componentDidMount() {
        require('react-select/dist/react-select.css');
    }

    handleChange(selectedOption) {
        this.setState({ query: selectedOption.value });
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
                <Select
                    name="id selected"
                    value={this.state.query}
                    onChange={this.handleChange}
                    options={this.state.options}
                />
                <Chart3 filter={this.state.query} year={this.state.year}/>
            </div>
        );
    }
}
export default Graph1;
