import React from 'react';
import Select from 'react-select';
import DatePicker from 'material-ui/DatePicker';
import Slider from 'rc-slider';
import ChartTPD from './chart_tpd.jsx';
import DateRange from 'material-ui-icons/DateRange';


const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const styles = {
  dataRangeIcon: {
    width: 30,
    height: 30,
    marginTop: 8
  },
  datePicker: {
    marginLeft: 10,
    marginRight: 10
  }
};

class WrapperTPD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      options: [],
      controlledDate: new Date(),
      rangeValue: [6, 20],
    };
    this.handleCompanySelected = this.handleCompanySelected.bind(this);
    this.handleDateSelected = this.handleDateSelected.bind(this);
    this.handleRangeSelected = this.handleRangeSelected.bind(this);
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
    require('rc-slider/assets/index.css');
  }

  handleCompanySelected(selectedOption) {
    this.setState({ query: selectedOption.value });
  }

  handleDateSelected(event, date) {
    this.setState({
      controlledDate: date,
    });
  }

  handleRangeSelected(value) {
    this.setState({ rangeValue: value });
  }

  render() {
    return (
      <div className="graphContainer">
        <h2> Evolution of tickets sold over the day </h2>
        <div className="graphInputContainer">
          <DateRange style={styles.dataRangeIcon} />
          <DatePicker
            hintText="Date Input"
            value={this.state.controlledDate}
            onChange={this.handleDateSelected}
            style={styles.datePicker}
          />
          <Select
            name="year selected"
            className="selectTdp"
            value={this.state.query}
            onChange={this.handleCompanySelected}
            options={this.state.options}
            clearable={false}
          />
          <Range
            className="slider"
            defaultValue={this.state.rangeValue}
            allowCross={false}
            max={23}
            onChange={this.handleRangeSelected}
            tipFormatter={value => `${value}h`}
          />
        </div>

        <div className="graph">
          <ChartTPD
            filter={this.state.query}
            date={this.state.controlledDate}
            range={this.state.rangeValue}
          />
        </div>
      </div>
    );
  }
}
export default WrapperTPD;
