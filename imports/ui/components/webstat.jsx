import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import TicketsAggregated from '../../../imports/Collections/ticketsAggregated';
import Recharts from "recharts"
import Slider from 'material-ui/Slider';
import PickTime from './picktime';

const {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;

class WebStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.ready) {
      return (
        <div>chargement</div>
      )
    }
    if (!this.props.ticketsAggregated) { // si pas de ticket dans la base
      return (
        <div>pas de ticket disponible</div>
      )
    }
    else {
      return (
          <div>
            <PickTime />
            <BarChart width={600} height={300} data={this.props.ticketsAggregated}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="_id" tick={false} name="ID attraction" label="ID attraction" />
              <YAxis type="number" allowDecimals={false}/>
              <Tooltip/>
              <Legend/>
              <Bar dataKey="sum" fill="#8884d8" name="number of tickets"/>
            </BarChart>
          </div>
      );
    }
  }
}

export default withTracker(() => {
  const handle = Meteor.subscribe('ticketsAggregated');
  return {
    ready: handle.ready(),
    ticketsAggregated: TicketsAggregated.find().fetch(),
  };
})(WebStat);
