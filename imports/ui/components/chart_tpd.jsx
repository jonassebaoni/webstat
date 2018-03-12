import React from 'react';
import Recharts from 'recharts';
import moment from 'moment';
import { withTracker } from 'meteor/react-meteor-data';
import { TicketsDaily } from '../../../imports/Collections/ticketsAggregated';

const {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label,
} = Recharts;
const LabelStyle = {
  fontSize: '1em',
  fontWeight: 'bold',
  paddingTop: '20px',
};

class ChartTPD extends React.Component {
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
          <XAxis dataKey="_id" name="hours" unit="h">
            <Label value="hours" position="bottom" style={LabelStyle} />
          </XAxis>
          <YAxis type="number" allowDecimals={false}>
            <Label angle={270} position="left" value="tickets" style={LabelStyle} />
          </YAxis>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip labelFormatter={hour => `${hour}h`} />
          <Line type="monotone" dataKey="sum" stroke="#ff0000" name="number of tickets" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
export default withTracker(({ filter, date, range }) => {
  const dateObj = moment(date).toObject();
  const handle = Meteor.subscribe('ticketsDaily', filter, dateObj, range);
  return {
    ready: handle.ready(),
    ticketsFiltered: TicketsDaily.find().fetch(),

  };
})(ChartTPD);
