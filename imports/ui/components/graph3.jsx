import React from 'react';
import Select from 'react-select';
import Chart3 from './chart3.jsx';

const listYears = [
    {value: 2017, label: 2017},
    {value: 2018, label: 2018}
];

class Graph3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            options: [],
            yearSelected: new Date().getFullYear(),
        };
        this.handleCompanySelected = this.handleCompanySelected.bind(this);
        this.handleYearSelected = this.handleYearSelected.bind(this);
    }
    componentWillMount() {
        //on recupere les entreprises depuis le parent et on l'injecte dans le state
        const options = [];
        this.props.options.map((company) => {
            options.push({value: company._id, label: company.name})
        });
        this.setState({
            options,
            query: options[0].value, // valeur par defaut (Sudri'Cub)
        });
    }

    componentDidMount() {
        require('react-select/dist/react-select.css');
    }

    handleCompanySelected(selectedOption) {
        this.setState({ query: selectedOption.value });
    }

    handleYearSelected(selectedOption) {
        this.setState({ yearSelected: selectedOption.value });
    }

    render() {
        return (
            <div>
                <Select
                    name="year selected"
                    value={this.state.yearSelected}
                    onChange={this.handleYearSelected}
                    options={listYears}
                />
                <Select
                    name="id selected"
                    value={this.state.query}
                    onChange={this.handleCompanySelected}
                    options={this.state.options}
                />
                <Chart3 filter={this.state.query} yearSelected={this.state.yearSelected} />
            </div>
        );
    }
}
export default Graph3;
