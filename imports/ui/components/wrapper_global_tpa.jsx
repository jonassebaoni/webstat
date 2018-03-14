import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import ChartGlobalTPA from './chart_global_tpa.jsx';


class WrapperGlobalTPA extends React.PureComponent {
  render() {
    return (
      <div className="graphContainer">
        <h2> Number of tickets per attraction </h2>
        <div className="graph">
          <ChartGlobalTPA
            selectedYear={this.props.selectedYear}
            options={this.props.options}
          />
        </div>
      </div>
    );
  }
}

WrapperGlobalTPA.propTypes = {
  selectedYear: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WrapperGlobalTPA;
