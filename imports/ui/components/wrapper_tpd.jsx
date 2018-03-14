import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import DateRange from 'material-ui-icons/DateRange';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import ChartTPD from './chart_tpd.jsx';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);


const styles = {
  dataRangeIcon: {
    width: 30,
    height: 30,
    marginTop: 8,
  },
  datePicker: {
    marginLeft: 10,
    marginRight: 10,
  },
};

class WrapperTPD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      controlledDate: new Date(),
      rangeValue: [6, 20],
    };
    this.handleDateSelected = this.handleDateSelected.bind(this);
    this.handleRangeSelected = this.handleRangeSelected.bind(this);
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
            filter={this.props.selectedCompany}
            date={this.state.controlledDate}
            range={this.state.rangeValue}
          />
        </div>
      </div>
    );
  }
}

WrapperTPD.propTypes = {
  selectedCompany: PropTypes.string.isRequired,
};
export default WrapperTPD;
