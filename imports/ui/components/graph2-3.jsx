import React from 'react';
import Select from 'react-select';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Chart3 from './chart3.jsx';
import Chart2 from './chart2.jsx';

const listYears = [
    {value: 2017, label: 2017},
    {value: 2018, label: 2018}
];

const buttonStyle = {
    display: 'inline-block',
    marginLeft: 25,
}
class Graph3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            options: [],
            yearSelected: new Date().getFullYear(),
            isBar: false,
        };
        this.handleCompanySelected = this.handleCompanySelected.bind(this);
        this.handleYearSelected = this.handleYearSelected.bind(this);
        this.handleLineClick = this.handleLineClick.bind(this);
        this.handleBarClick = this.handleBarClick.bind(this);
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

    handleBarClick() {
        this.setState({isBar: true});
    }

    handleLineClick() {
        this.setState({isBar: false});
    }

    render() {
        const isBar = this.state.isBar;
        let chart = null;

        if(isBar)  {
            chart = <Chart3 filter={this.state.query} yearSelected={this.state.yearSelected} />
        }
        else {
            chart = <Chart2 filter={this.state.query} yearSelected={this.state.yearSelected} />
        }

        return (
            <div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
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
                    <RadioButtonGroup name="select chart style" defaultSelected="line" style={{display: 'flex', flexDirection: 'row'}}>
                        <RadioButton
                            value="line"
                            label="Line"
                            onClick={this.handleLineClick}
                            style={buttonStyle}
                        />
                        <RadioButton
                            value="bar"
                            label="Bar"
                            onClick={this.handleBarClick}
                            style={buttonStyle}
                        />
                    </RadioButtonGroup>
                </div>
                {chart}
            </div>
        );
    }
}
export default Graph3;
