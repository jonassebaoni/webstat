import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {TicketsAggregated, TicketsMonthly} from '../../../imports/Collections/ticketsAggregated';
import Recharts from "recharts";

const {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;

class Chart1 extends React.Component {
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
        console.log(this.props.ticketsFiltered);
        return (
            <LineChart t width={730} height={250} data={this.props.ticketsFiltered}
                       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="_id"  name="Months" label="Months" />
                <YAxis type="number" allowDecimals={false}/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="sum" stroke="#82ca9d" name="number of tickets"/>
            </LineChart>
        );
    }
}
export default withTracker(({yearSelected}) => {
    console.log("year selected " + yearSelected);
    const handle = Meteor.subscribe('ticketsMonthly', yearSelected);
    return {
        ready: handle.ready(),
        ticketsFiltered: TicketsMonthly.find().fetch(),

    };
})(Chart1);