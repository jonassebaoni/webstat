import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import { TicketsMonthly } from '../../../imports/Collections/ticketsAggregated';
import Recharts from "recharts";
import moment from "moment";

const {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;

class Chart2 extends React.Component {
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
            <LineChart width={700} height={350} data={this.props.ticketsFiltered}
                       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="_id"  name="months" label="months" tickFormatter={(tick) => {return moment(tick, 'MM').format('MMMM');}} />
                <YAxis type="number" allowDecimals={false}/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="sum" stroke="#ff0000" name="number of tickets"/>
            </LineChart>
        );
    }
}
export default withTracker((filter, yearSelected) => {
    const handle = Meteor.subscribe('ticketsMonthly', 'WsfwmSogru3CpzsHd', yearSelected);
    return {
        ready: handle.ready(),
        ticketsFiltered: TicketsMonthly.find().fetch(),

    };
})(Chart2);