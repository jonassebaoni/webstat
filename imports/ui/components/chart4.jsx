import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import  { TicketsWeekly }  from '../../../imports/Collections/ticketsAggregated';
import Recharts from "recharts";
import moment from "moment";

const {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} = Recharts;
const LabelStyle = {
    fontSize: '1em',
    fontWeight: 'bold',
    paddingTop: '20px',
};

const dayOfCurrentWeek = moment().isoWeekday();

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
            <BarChart width={700} height={350} data={this.props.ticketsFiltered}
                      margin={{top: 25, right: 30, left: 20, bottom: 25}}>
                <XAxis dataKey="_id"  name="days"  tickFormatter={(tick) => {return moment(tick, 'E').format('dddd');}}>
                    <Label value="days" position="insideBottomRight" style={LabelStyle}/>
                </XAxis>
                <YAxis type="number" allowDecimals={false}>
                    <Label angle={270} position='insideLeft' style={{ textAnchor: 'middle' }} value="number of tickets" style={LabelStyle}/>
                </YAxis>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="sum" fill="#e6e600" name="number of tickets"/>
            </BarChart>
        );
    }
}
export default withTracker(({filter}) => {
    // on recupere l'id de l'entreprise
    const handle = Meteor.subscribe('ticketsWeekly', filter, new Date().getFullYear(), dayOfCurrentWeek);
    return {
        ready: handle.ready(),
        ticketsFiltered: TicketsWeekly.find().fetch(),

    };
})(Chart4);