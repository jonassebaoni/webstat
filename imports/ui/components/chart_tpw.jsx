import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { TicketsWeekly } from '../../../imports/Collections/ticketsAggregated';
import Recharts from 'recharts';
import moment from 'moment';

const {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer,
} = Recharts;
const LabelStyle = {
  fontSize: '1em',
  fontWeight: 'bold',
  paddingTop: '20px',
};

class ChartTPW extends React.Component {
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
        <BarChart
          data={this.props.ticketsFiltered}
          margin={{
 top: 25, right: 30, left: 20, bottom: 25,
}}
        >
          <XAxis dataKey="_id" name="days" tickFormatter={tick => moment(tick, 'E').format('dddd')}>
            <Label value="days" position="bottom" style={LabelStyle} />
          </XAxis>
          <YAxis type="number" allowDecimals={false}>
            <Label angle={270} position="left" style={{ textAnchor: 'middle' }} value="tickets" style={LabelStyle} />
          </YAxis>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip labelFormatter={day => moment(day, 'E').format('dddd')}/>
          <Bar dataKey="sum" fill="#f4c542" name="number of tickets" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
export default withTracker(({ filter }) => {
  // on recupere l'id de l'entreprise
  const handle = Meteor.subscribe('ticketsWeekly', filter, new Date().getFullYear(), moment().week());
  return {
    ready: handle.ready(),
    ticketsFiltered: TicketsWeekly.find().fetch(),

  };
})(ChartTPW);
