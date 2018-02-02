import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import { TicketsMonthly } from '../../../imports/Collections/ticketsAggregated';
import Recharts from "recharts";

const {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;

class Chart5 extends React.Component {
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
            <LineChart  width={700} height={350} data={this.props.ticketsFiltered}
                       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="_id"  name="months" label="months" />
                <YAxis type="number" allowDecimals={false}/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="sum" stroke="#ff0000" name="number of tickets"/>
            </LineChart>
        );
    }
}
export default withTracker(({}) => {
    const handle = Meteor.subscribe('ticketsWeekly', );
    return {
        ready: handle.ready(),
        ticketsFiltered: TicketsMonthly.find().fetch(),

    };
})(Chart5);