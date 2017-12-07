import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import Tickets from '../../../imports/Collections/tickets';
import {YearAggregated} from '../../../imports/Collections/ticketsAggregated'
import Recharts from "recharts";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {MonthAggregated} from "../../Collections/ticketsAggregated";

const {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;

class Global2 extends React.Component {
    constructor(props) {
        super(props);
      this.state = {
        selectedOption: ''
      }
    }

    loadOptions(opt)  {
        console.log(this.props.ticketsAggregated);
        let i;
        let a = [];
        for(i=0; i<opt.length; i++){
            a.push({value: i, label: opt[i]["_id"]});
        }
        return a;
    }


    handleChange(selectedOption) {
        this.setState({ selectedOption });
        console.log(`id selected: ${selectedOption.label}`);
        console.log(`value: ${selectedOption.value}`);
    }


    render() {
        if (!this.props.ready) {
            return (
                <div>chargement</div>
            )
        }
        if (!this.props.tickets) { // si pas de ticket dans la base
            return (
                <div>pas de ticket disponible</div>
            )
        }

        else {
            return (
                <Select
                  name="id selected"
                  value={this.state.selectedOption}
                  onChange={this.handleChange.bind(this)}
                  options= {this.loadOptions(this.props.tickets)}
                />
            );
        }
    }
}
export default withTracker(({query}) => {
    console.log(query);
    console.log(MonthAggregated.find({}).fetch())
    const handle = Meteor.subscribe('ticketsMonth');
    return {
        ready: handle.ready(),
        tickets: MonthAggregated.find({}, { sort: {_id : 1 } }).fetch(),

    };
})(Global2);