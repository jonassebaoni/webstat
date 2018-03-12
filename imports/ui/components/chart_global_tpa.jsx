import React from 'react';
import Recharts from 'recharts';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { TicketsAggregated } from '../../../imports/Collections/ticketsAggregated';

const {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, ResponsiveContainer,
} = Recharts;

const LabelStyle = {
  fontSize: '1em',
  fontWeight: 'bold',
  textAnchor: 'middle',
  height: 15,
};

class ChartGlobalTPA extends React.Component {
  constructor(props) {
    super(props);
    this.tickFormatter = this.tickFormatter.bind(this);
  }

  /* Fais correspondre l'id et le nom de l'attraction
     Retourne le nom de l'attraction
  */
  tickFormatter(tick) {
    let companyName = '';
    for (let i = 0; i < this.props.options.length; i += 1) {
      if (tick === this.props.options[i]._id) {
        companyName = this.props.options[i].name;
        break;
      }
    }
    return companyName;
  }

  render() {
    if (!this.props.ready) {
      return null;
    }
    // si pas de ticket dans la base
    if (this.props.ticketsFiltered === []) {
      return (
        <div>pas de ticket disponible</div>
      );
    }
    return (
      <ResponsiveContainer>
        <BarChart
          data={this.props.ticketsFiltered}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="_id" tickFormatter={this.tickFormatter} name="ID attraction" >
            <Label value="attraction name" position="bottom" style={LabelStyle} />
          </XAxis>
          <YAxis type="number" allowDecimals={false}>
            <Label angle={270} position="left" value="total tickets" style={LabelStyle} />
          </YAxis>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip labelFormatter={this.tickFormatter}/>
          <Bar dataKey="sum" fill="#8884d8" name="number of tickets" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

ChartGlobalTPA.defaultProps = {
  height: 250,
  ready: false,
};

ChartGlobalTPA.propTypes = {
  height: PropTypes.number,
  ready: PropTypes.bool,
  ticketsFiltered: PropTypes.arrayOf(PropTypes.object).isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withTracker(({yearSelected}) => {
  const handle = Meteor.subscribe('ticketsAggregated', yearSelected);
  return {
    ready: handle.ready(),
    ticketsFiltered: TicketsAggregated.find({}).fetch(),

  };
})(ChartGlobalTPA);
