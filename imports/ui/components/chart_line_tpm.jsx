import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { TicketsMonthly } from '../../../imports/Collections/ticketsAggregated';
import Recharts from 'recharts';
import moment from 'moment';
import PropTypes from 'prop-types';

const {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Label, ResponsiveContainer,
} = Recharts;


const styles = {
  label: {
    fontSize: '1em',
    fontWeight: 'bold',
  },
};

class ChartLineTPM extends React.PureComponent {
  render() {
    if (!this.props.ready) {
      return null;
    }
    // si pas de ticket dans la base
    if (this.props.ticketsFiltered === []) {
      return (
        <div>pas de ticket disponible</div>
      );
    }
    return (
      <ResponsiveContainer>
        <LineChart
          data={this.props.ticketsFiltered}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="_id" name="months" tickFormatter={tick => moment(tick, 'MM').format('MMMM')} >
            <Label value="months" position="bottom" style={styles.label} />
          </XAxis>
          <YAxis type="number" allowDecimals={false}>
            <Label angle={270} position="left" value="tickets" style={styles.label} />
          </YAxis>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip labelFormatter={month => moment(month, 'MM').format('MMMM')} />
          <Line type="monotone" dataKey="sum" stroke="#ff0000" name="number of tickets" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

ChartLineTPM.defaultProps = {
  ready: false,
};
ChartLineTPM.propTypes = {
  ready: PropTypes.bool,
  ticketsFiltered: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default withTracker(({ filter, yearSelected }) => {
  // on recupere l'id de l'entreprise
  const handle = Meteor.subscribe('ticketsMonthly', filter, yearSelected);
  return {
    ready: handle.ready(),
    ticketsFiltered: TicketsMonthly.find().fetch(),

  };
})(ChartLineTPM);
