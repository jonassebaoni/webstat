import React from 'react';
import Select from 'react-select';
import Chart5 from './chart5.jsx';
import PickDate from './pickdate.jsx';

class Graph5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            options: [],
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
            query: options[0].value, // valeur par defaut (Sudri'Cub)
        });
    }

    componentDidMount() {
        require('react-select/dist/react-select.css');
    }

    handleChange(selectedOption) {
        this.setState({ query: selectedOption.value });
    }

    render() {
        return (
            <div>
                <PickDate/>
                <Chart5 filter={this.state.query} />
            </div>
        );
    }
}
export default Graph5;
