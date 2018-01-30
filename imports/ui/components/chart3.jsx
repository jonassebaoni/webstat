import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import  { TicketsMonthly }  from '../../../imports/Collections/ticketsAggregated';
import Recharts from "recharts";

const {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;

class Chart3 extends React.Component {
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
            <BarChart width={600} height={300} data={this.props.ticketsFiltered}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="_id" tick={false} name="ID attraction" label="ID attraction" />
                <YAxis type="number" allowDecimals={false}/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="sum" fill="#8884d8" name="number of tickets"/>
            </BarChart>
        );
    }
}
export default withTracker(({filter}) => {
    // on recupere l'id de l'entreprise
    console.log(filter)
    const handle = Meteor.subscribe('ticketsMonthly', 2018, filter);
    return {
        ready: handle.ready(),
        ticketsFiltered: TicketsMonthly.find().fetch(),

    };
})(Chart3);