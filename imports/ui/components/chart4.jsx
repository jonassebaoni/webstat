import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import  { TicketsWeekly }  from '../../../imports/Collections/ticketsAggregated';
import Recharts from "recharts";

const {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;

class Chart4 extends React.Component {
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
            <LineChart t width={730} height={250} data={this.props.ticketsFiltered}
                       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="_id"  name="weeks" label="weeks" />
                <YAxis type="number" allowDecimals={false}/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="sum" stroke="#82ca9d" name="number of tickets"/>
            </LineChart>
        );
    }
}
export default withTracker(({filter}) => {
    // on recupere l'id de l'entreprise
    console.log(filter)
    const handle = Meteor.subscribe('ticketsWeekly', filter);
    return {
        ready: handle.ready(),
        ticketsFiltered: TicketsWeekly.find().fetch(),

    };
})(Chart4);