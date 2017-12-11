import React from 'react';
import Select from 'react-select';
import Chart1 from './chart1.jsx';

class Graph1 extends React.Component {
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
      query: options[0].value, // valeur par default
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
              <Select
                  name="id selected"
                  value={this.state.query}
                  onChange={this.handleChange}
                  options={this.state.options}
              />
            <Chart1 filter={this.state.query}/>
          </div>
      );
  }
}
export default Graph1;
