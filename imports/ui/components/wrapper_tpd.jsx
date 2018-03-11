import React from 'react';
import Select from 'react-select';
import DatePicker from 'material-ui/DatePicker';
import Slider from 'rc-slider';
import ChartTPD from './chart_tpd.jsx';
import DateRange from 'material-ui-icons/DateRange';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

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
    const options = [];
    this.props.options.map((company) => {
      options.push({ value: company._id, label: company.name });
    });
    this.setState({
      options,
      query: options[0].value, // valeur par defaut (Sudri'Cub)
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
      <div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <DateRange style={{ marginLeft: '60px', margiBottom: '10px', marginTop: '10px', width: 40, height: 40 }} />
          <DatePicker
            hintText="Date Input"
            value={this.state.controlledDate}
            onChange={this.handleDateSelected}
            style={{ marginLeft: '10px', paddingBottom: '10px' }}
          />
          <Select
            name="year selected"
            value={this.state.query}
            onChange={this.handleCompanySelected}
            options={this.state.options}
            clearable={false}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Range
            defaultValue={this.state.rangeValue}
            allowCross={false}
            style={{
 width: '350px', marginLeft: '80px', marginBottom: '15px', marginTop: '10px',
}}
            max={23}
            onChange={this.handleRangeSelected}
            tipFormatter={value => `${value}h`}
          />
        </div>
        <ChartTPD
          filter={this.state.query}
          date={this.state.controlledDate}
          range={this.state.rangeValue}
        />
      </div>
    );
  }
}
export default WrapperTPD;
