import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import ChartTPD from './chart_tpd.jsx';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);


class WrapperTPD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeValue: [6, 20],
    };
    this.handleRangeSelected = this.handleRangeSelected.bind(this);
  }

  handleRangeSelected(value) {
    this.setState({ rangeValue: value });
  }

  render() {
    return (
      <div className="graphContainer">
        <h2> Evolution of tickets sold over the day </h2>
        <div className="graphInputContainer">
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
            tickets={this.props.tickets}
            range={this.state.rangeValue}
          />
        </div>
      </div>
    );
  }
}

WrapperTPD.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default WrapperTPD;
