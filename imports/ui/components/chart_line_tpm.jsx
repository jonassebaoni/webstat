import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { TicketsMonthly } from '../../../imports/Collections/ticketsAggregated';
import Recharts from 'recharts';
import moment from 'moment';

const {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer,
} = Recharts;
const LabelStyle = {
  fontSize: '1em',
  fontWeight: 'bold',
};

class ChartLineTPM extends React.Component {
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
      <ResponsiveContainer aspect={16.0 / 9.0}>
        <LineChart
          data={this.props.ticketsFiltered}
          margin={{
 top: 25, right: 30, left: 20, bottom: 25,
}}
        >
          <XAxis dataKey="_id" name="months" tickFormatter={tick => moment(tick, 'MM').format('MMMM')} >
            <Label value="months" position="bottom" style={LabelStyle} />
          </XAxis>
          <YAxis type="number" allowDecimals={false}>
            <Label angle={270} position="left" style={{ textAnchor: 'middle' }} value="tickets" style={LabelStyle} />
          </YAxis>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip labelFormatter={month => moment(month, 'MM').format('MMMM')} />
          <Line type="monotone" dataKey="sum" stroke="#ff0000" name="number of tickets" />
        </LineChart>
      </ResponsiveContainer>
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
})(ChartLineTPM);
