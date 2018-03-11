import React from 'react';
import Select from 'react-select';
import ChartGlobalTPA from './chart_global_tpa.jsx';
import PropTypes from 'prop-types';

const listYears = [
  { value: 2017, label: 2017 },
  { value: 2018, label: 2018 },
];

class WrapperGlobalTPA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yearSelected: new Date().getFullYear(),
    };
    this.handleYearSelected = this.handleYearSelected.bind(this);
  }

  handleYearSelected(selectedOption) {
    this.setState({ yearSelected: selectedOption.value });
  }

  render() {
    return (
      <div className="graphContainer">
        <h2> Number of tickets per attraction </h2>
        <Select
          name="year selected"
          value={this.state.yearSelected}
          onChange={this.handleYearSelected}
          options={listYears}
          clearable={false}
        />
        <div className="graph">
          <ChartGlobalTPA
            yearSelected={this.state.yearSelected}
            options={this.props.options}
            height={this.props.height}
          />
        </div>
      </div>
    );
  }
}

WrapperGlobalTPA.defaultProps = {
  height: 250,
};

WrapperGlobalTPA.propTypes = {
  height: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WrapperGlobalTPA;
