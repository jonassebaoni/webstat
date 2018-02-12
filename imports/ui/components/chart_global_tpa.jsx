import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import { TicketsAggregated } from '../../../imports/Collections/ticketsAggregated';
import Recharts from "recharts"

const {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, Legend, ResponsiveContainer} = Recharts;

const LabelStyle = {
    fontSize: '1em',
    fontWeight: 'bold'
};

class ChartGlobalTPA extends React.Component {

    constructor(props) {
        super(props);
        this.tickFormatter = this.tickFormatter.bind(this);
    }

    /* Fais correspondre l'id et le nom de l'attraction
       Retourne le nom de l'attraction
     */
    tickFormatter(tick) {
        let companyName = "";
        for(let i=0; i<this.props.options.length; i++){
            if(tick == this.props.options[i]["_id"]){
                companyName = this.props.options[i]["name"];
                break;
            }
        }
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
         <ResponsiveContainer aspect={16.0/9.0}>
            <BarChart data={this.props.ticketsFiltered}
                      margin={{top: 25, right: 30, left: 20, bottom: 25}}>
              <XAxis dataKey="_id" tickFormatter={this.tickFormatter} name="ID attraction" >
                  <Label value="attraction name" position="insideBottomRight" style={LabelStyle}/>
              </XAxis>
              <YAxis type="number" allowDecimals={false}>
                  <Label angle={270} position='insideLeft' style={{ textAnchor: 'middle' }} value="total tickets" style={LabelStyle}/>
              </YAxis>
                <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend/>
              <Bar dataKey="sum" fill="#8884d8" name="number of tickets"/>
            </BarChart>
          </ResponsiveContainer>

      );
  }
}

export default withTracker(() => {
  const handle = Meteor.subscribe('ticketsAggregated');
  return {
      ready: handle.ready(),
      ticketsFiltered: TicketsAggregated.find({}).fetch(),

  };
})(ChartGlobalTPA);