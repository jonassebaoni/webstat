import React from 'react';
import Select from 'react-select';
import ChartTPW from './chart_tpw.jsx';

class WrapperTPW extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      options: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    // on recupere les entreprises depuis le parent et on l'injecte dans le state
    const options = this.props.options.map((company) => ({ value: company._id, label: company.name }));

    this.setState({
      options,
      query: options[2].value, // valeur par defaut (EcoLejour)
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
      <div className="graphContainer">
        <h2> Evolution of tickets sold over the current week </h2>
        <Select
          name="id selected"
          value={this.state.query}
          onChange={this.handleChange}
          options={this.state.options}
          clearable={false}
        />
        <ChartTPW filter={this.state.query} />
      </div>
    );
  }
}
export default WrapperTPW;
