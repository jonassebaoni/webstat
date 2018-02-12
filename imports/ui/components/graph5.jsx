import React from 'react';
import Select from 'react-select';
import DatePicker from 'material-ui/DatePicker';
import Chart5 from './chart5.jsx';


class Graph5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            options: [],
            controlledDate: new Date(),
        };
        this.handleCompanySelected = this.handleCompanySelected.bind(this);
        this.handleDateSelected = this.handleDateSelected.bind(this);
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

    handleDateSelected = (event, date) => {
        console.log(date);
        this.setState({
            controlledDate: date
        });
    };

    render() {
        return (
            <div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <DatePicker
                        hintText="Date Input"
                        value={this.state.controlledDate}
                        onChange={this.handleDateSelected}
                        style={{marginLeft: "60px", margiBottom: "10px"}}
                    />
                    <Select
                        name="year selected"
                        value={this.state.query}
                        onChange={this.handleCompanySelected}
                        options={this.state.options}
                    />
                </div>
                <Chart5 filter={this.state.query} date={this.state.controlledDate} />
            </div>
        );
    }
}
export default Graph5;
