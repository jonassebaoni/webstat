import React from 'react';
import Select from 'react-select';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ChartBarTPM from './chart_bar_tpm.jsx';
import ChartLineTPM from './chart_line_tpm.jsx';


const listYears = [
  { value: 2017, label: 2017 },
  { value: 2018, label: 2018 },
];
const styles = {
  button: {
    display: 'inline-block',
    marginLeft: 25,
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 6,
  },
};

class WrapperTPM extends React.Component {
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
    // on recupere les entreprises depuis le parent et on l'injecte dans le state
    const options = this.props.options.map((company) => ({ value: company._id, label: company.name }));
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
    this.setState({ isBar: true });
  }

  handleLineClick() {
    this.setState({ isBar: false });
  }

  render() {
    const { isBar } = this.state;
    let chart = null;

    if (isBar) {
      chart = <ChartBarTPM filter={this.state.query} yearSelected={this.state.yearSelected} />;
    } else {
      chart = <ChartLineTPM filter={this.state.query} yearSelected={this.state.yearSelected} />;
    }

    return (
      <div className="graphContainer">
        <h2> Evolution of tickets sold over the year </h2>
        <div className="graphInputContainer">
          <Select
            name="year selected"
            value={this.state.yearSelected}
            onChange={this.handleYearSelected}
            options={listYears}
            clearable={false}
          />
          <Select
            name="id selected"
            value={this.state.query}
            onChange={this.handleCompanySelected}
            options={this.state.options}
            clearable={false}
          />
          <RadioButtonGroup
            name="select chart style"
            defaultSelected="line"
            style={styles.radioGroup}
          >
            <RadioButton
              value="line"
              label="Line"
              onClick={this.handleLineClick}
              style={styles.button}
            />
            <RadioButton
              value="bar"
              label="Bar"
              onClick={this.handleBarClick}
              style={styles.button}
            />
          </RadioButtonGroup>
        </div>

        <div className="graph">
          {chart}
        </div>
      </div>
    );
  }
}

export default WrapperTPM;
