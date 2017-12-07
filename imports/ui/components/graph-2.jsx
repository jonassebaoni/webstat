import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import Tickets from '../../../imports/Collections/tickets';
import {YearAggregated} from '../../../imports/Collections/ticketsAggregated'
import Recharts from "recharts";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;

const ids = [
  { key: '1', value: 'show', text: i18n.__('attraction-fields', 'show') },
  { key: '2', value: 'restaurant', text: i18n.__('attraction-fields', 'restaurant') },
  { key: '3', value: 'thrill', text: i18n.__('attraction-fields', 'thrill') },
  { key: '4', value: 'kids', text: i18n.__('attraction-fields', 'kids') },
  { key: '5', value: 'family', text: i18n.__('attraction-fields', 'family') },
];

class Global2 extends React.Component {
    constructor(props) {
        super(props);
      this.state = {
        selectedOption: ''
      }
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
                  options= {ids}
                />
                <Global2 query={this.state.query}/>
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
        tickets: YearAggregated.find({_id: query}).fetch(),

    };
})(Global2);