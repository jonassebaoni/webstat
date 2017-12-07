import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import Tickets from '../../../imports/Collections/tickets';
import {YearAggregated} from '../../../imports/Collections/ticketsAggregated'
import Recharts from "recharts";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;

class Global2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null ,
        };
    }

    loadOptions(opt)  {
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
                <div>
                    <Select
                        name="id selected"
                        value={this.state.selectedOption}
                        onChange={this.handleChange.bind(this)}
                        options= {this.loadOptions(this.props.tickets)}
                    />
                </div>
            );
        }
    }
}
export default withTracker(({query}) => {
    console.log(query);
    console.log(YearAggregated.find({}).fetch())
    const handle = Meteor.subscribe('ticketsYear');
    return {
        ready: handle.ready(),
        tickets: YearAggregated.find({}).fetch(),

    };
})(Global2);