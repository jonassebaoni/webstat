import React from 'react';
import Recharts from 'recharts';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withTracker } from 'meteor/react-meteor-data';
import { TicketsWeather } from '../../../imports/Collections/ticketsAggregated';

const {
  PieChart, Pie, Tooltip, ResponsiveContainer, Cell, LabelList,
} = Recharts;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#bf42f4', '#f44242', '#42f448'];
const LabelStyle = {
  fontSize: '1em',
  fontWeight: 'bold',
};
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent,
}) => {
  const radius = innerRadius + ((outerRadius - innerRadius) * 0.5);
  const x = cx + (radius * Math.cos(-midAngle * RADIAN));
  const y = cy + (radius * Math.sin(-midAngle * RADIAN));

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class ChartGlobalWeather extends React.Component {
  constructor(props) {
    super(props);
    this.getSkyName = this.getSkyName.bind(this);
  }

  // Méthode qui retourne le nom (condition météo) associé au skyCode
  // TODO faire un switch
  getSkyName(skyCode) {
    if ((skyCode >= 0 && skyCode <= 4) || skyCode === 17 || skyCode === 35) {
      return 'Thunderstorm';
    } else if (skyCode === 5) {
      return 'Rain/Snow mix';
    } else if (skyCode === 6) {
      return 'Sleet/Snow mix';
    } else if (skyCode === 7) {
      return 'Rain/Snow/Sleet mix';
    } else if (skyCode === 8 || skyCode === 9) {
      return 'Icy';
    } else if (skyCode === 10) {
      return 'Rain/Sleet mix';
    } else if (skyCode === 11) {
      return 'Light Rain';
    } else if (skyCode === 12) {
      return 'Rain';
    } else if (skyCode === 13) {
      return 'Light snow';
    } else if (skyCode === 14 || skyCode === 16 || skyCode === 42 || skyCode === 43) {
      return 'Snow';
    } else if (skyCode === 15) {
      return 'Blizzard';
    } else if (skyCode === 18 || skyCode === 40) {
      return 'Showers';
    } else if (skyCode === 19) {
      return 'Dust';
    } else if (skyCode === 20) {
      return 'Fog';
    } else if (skyCode === 21) {
      return 'Haze';
    } else if (skyCode === 22) {
      return 'Smoke';
    } else if (skyCode === 23 || skyCode === 24) {
      return 'Frigid';
    } else if (skyCode === 26) {
      return 'Cloudy';
    } else if (skyCode === 27 || skyCode === 29 || skyCode === 33) {
      return 'Partially Cloudy (night)';
    } else if (skyCode === 28 || skyCode === 30 || skyCode === 34) {
      return 'Partially Cloudy';
    } else if (skyCode === 31) {
      return 'Cleat (night)';
    } else if (skyCode === 32) {
      return 'Clear';
    } else if (skyCode === 36) {
      return 'Hot';
    } else if (skyCode === 37 || skyCode === 38) {
      return 'Scattered Thunderstorms';
    } else if (skyCode === 39) {
      return 'Scattered SHowers';
    } else if (skyCode === 41) {
      return 'Scattered Snow Showers';
    } else if (skyCode === 44) {
      return 'N/A';
    } else if (skyCode === 45) {
      return 'Scattered Rain Showers (night)';
    } else if (skyCode === 46) {
      return 'Scattered Snow Showers (night)';
    } else if (skyCode === 47) {
      return 'Scattered Thunderstorms (night)';
    }
    return 'N/A';
  }


  render() {
    if (!this.props.ready) {
      return (
        <div>chargement</div>
      );
    }
    // si pas de ticket dans la base
    if (this.props.ticketsFiltered === []) {
      return (
        <div>pas de ticket disponible</div>
      );
    }
    return (
      <ResponsiveContainer aspect={16.0 / 9.0}>
        <PieChart>
          <Pie
            data={this.props.ticketsFiltered}
            nameKey="_id"
            dataKey="sum"
            fill="#82ca9d"
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {
              this.props.ticketsFiltered
                  .map((entry, index) =>
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />)
                        }
            <LabelList dataKey="_id" position="outside" style={LabelStyle} formatter={this.getSkyName} />
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

ChartGlobalWeather.defaultProps = {
  ready: false,
};

ChartGlobalWeather.propTypes = {
  ready: PropTypes.bool,
  ticketsFiltered: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withTracker(() => {
  const handle = Meteor.subscribe('ticketsWeather');
  return {
    ready: handle.ready(),
    ticketsFiltered: TicketsWeather.find({}).fetch(),

  };
})(ChartGlobalWeather);
