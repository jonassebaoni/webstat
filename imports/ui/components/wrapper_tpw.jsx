import React from 'react';
import PropTypes from 'prop-types';
import ChartTPW from './chart_tpw.jsx';


class WrapperTPW extends React.PureComponent {
  render() {
    return (
      <div className="graphContainer">
        <h2> Evolution of tickets sold over the current week </h2>
        <ChartTPW
          tickets={this.props.tickets}
        />
      </div>
    );
  }
}

WrapperTPW.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default WrapperTPW;
