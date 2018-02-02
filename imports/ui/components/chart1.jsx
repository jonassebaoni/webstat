import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import { TicketsAggregated } from '../../../imports/Collections/ticketsAggregated';
import Recharts from "recharts"

const {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, Legend, ResponsiveContainer} = Recharts;

class Chart1 extends React.Component {

    constructor(props) {
        super(props);
        this.tickFormatter = this.tickFormatter.bind(this);
    }

    tickFormatter(tick) {
        let companyName = "";
        for(let i=0; i<this.props.options.length; i++){
            if(tick == this.props.options[i]["_id"]){
                companyName = this.props.options[i]["name"];
                break;
            }
        }
        //console.log("company id : "+ tick + " company name : " + companyName);
        return companyName;
    }

  render() {
    if (!this.props.ready) {
      return (
        <div>chargement</div>
      )
    }
    // si pas de ticket dans la base
    if (this.props.ticketsFiltered === []) {
      return (
        <div>pas de ticket disponible</div>
      )

    }
      return (
        <BarChart data={this.props.ticketsFiltered}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}
                  width={730} height={350}>
          <XAxis dataKey="_id" tickFormatter={this.tickFormatter} name="ID attraction" >
              <Label value="attraction name" position="insideBottomRight" />
          </XAxis>
          <YAxis type="number" allowDecimals={false} />
            <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend/>
          <Bar dataKey="sum" fill="#8884d8" name="number of tickets"/>
        </BarChart>

      );
  }
}

export default withTracker(() => {
  const handle = Meteor.subscribe('ticketsAggregated');
  return {
      ready: handle.ready(),
      ticketsFiltered: TicketsAggregated.find({}).fetch(),

  };
})(Chart1);