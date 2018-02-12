import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import { TicketsDaily } from '../../../imports/Collections/ticketsAggregated';
import Recharts from "recharts";
import moment from "moment";

const {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label} = Recharts;
const LabelStyle = {
    fontSize: '1em',
    fontWeight: 'bold',
    paddingTop: '20px',
};

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
            <ResponsiveContainer aspect={16.0/9.0}>
                <LineChart  width={700} height={350} data={this.props.ticketsFiltered}
                           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="_id" name="hours">
                        <Label value="hours" position="insideBottomRight" style={LabelStyle}/>
                    </XAxis>
                    <YAxis type="number" allowDecimals={false}>
                        <Label angle={270} position='insideLeft' style={{ textAnchor: 'middle' }} value="tickets" style={LabelStyle}/>
                    </YAxis>
                        <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="sum" stroke="#ff0000" name="number of tickets"/>
                </LineChart>
            </ResponsiveContainer>
        );
    }
}
export default withTracker(({filter, date}) => {
    console.log("attraction sélectionnées: "+filter);
    const dateObj = moment(date).toObject();

    console.log("Date sélectionnée: "+"année: "+dateObj["years"]+" mois: "+dateObj["months"]+" jour: "+dateObj["date"])
    const handle = Meteor.subscribe('ticketsDaily', filter, moment(date).toObject());
    return {
        ready: handle.ready(),
        ticketsFiltered: TicketsDaily.find().fetch(),

    };
})(Chart5);