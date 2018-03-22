import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { TicketsWeekly } from '../../collections/ticketsAggregated';
import Recharts from 'recharts';
import moment from 'moment';
import PropTypes from 'prop-types';

const {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, ResponsiveContainer,
} = Recharts;


const styles = {
  label: {
    fontSize: '1em',
    fontWeight: 'bold',
    paddingTop: '20px',
  },
};

class ChartTPW extends React.PureComponent {
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
        <BarChart
          data={this.props.ticketsFiltered}
          margin={{
            top: 5, right: 20, left: 10, bottom: 5,
          }}
        >
          <XAxis dataKey="_id" name="days" tickFormatter={tick => moment(tick, 'E').format('dddd')}>
            <Label value="days" position="bottom" style={styles.label} />
          </XAxis>
          <YAxis type="number" allowDecimals={false}>
            <Label angle={270} position="left" value="tickets" style={styles.label} />
          </YAxis>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip labelFormatter={day => moment(day, 'E').format('dddd')} />
          <Bar dataKey="sum" fill="#f4c542" name="number of tickets" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

ChartTPW.propTypes = {
  ready: PropTypes.bool.isRequired,
  ticketsFiltered: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedCompany: PropTypes.string.isRequired,
  selectedYear: PropTypes.number.isRequired,
  selectedWeek: PropTypes.number.isRequired,
};
export default withTracker(({ selectedCompany, selectedYear, selectedWeek }) => {
  // on recupere l'id de l'entreprise
  const handle = Meteor.subscribe('ticketsWeekly', selectedCompany, selectedYear, selectedWeek);
  return {
    ready: handle.ready(),
    ticketsFiltered: TicketsWeekly.find().fetch(),

  };
})(ChartTPW);
