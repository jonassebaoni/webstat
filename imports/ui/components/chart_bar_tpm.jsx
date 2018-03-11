import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { TicketsMonthly } from '../../../imports/Collections/ticketsAggregated';
import Recharts from 'recharts';
import moment from 'moment';

const {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer,
} = Recharts;
const LabelStyle = {
  fontSize: '1em',
  fontWeight: 'bold',
};

class ChartBarTPM extends React.Component {
  render() {
    if (!this.props.ready) {
      return (
        <div>chargement</div>
      );
    }
    // si pas de ticket dans la base
    if (this.props.ticketsFiltered === []) {
      return (
        <div>pas de ticket disponible</div>
      );
    }
    return (
      <BarChart
        data={this.props.ticketsFiltered}
      >
        <XAxis dataKey="_id" name="months" tickFormatter={tick => moment(tick, 'MM').format('MMMM')}>
          <Label value="months" position="bottom" style={LabelStyle} />
        </XAxis>
        <YAxis type="number" allowDecimals={false}>
          <Label angle={270} position="left" value="tickets" style={LabelStyle} />
        </YAxis>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip labelFormatter={month => moment(month, 'MM').format('MMMM')} />
        <Bar dataKey="sum" fill="#009933" name="number of tickets" />
      </BarChart>
    );
  }
}
export default withTracker(({ filter, yearSelected }) => {
  // on recupere l'id de l'entreprise
  const handle = Meteor.subscribe('ticketsMonthly', filter, yearSelected);
  return {
    ready: handle.ready(),
    ticketsFiltered: TicketsMonthly.find().fetch(),

  };
})(ChartBarTPM);
