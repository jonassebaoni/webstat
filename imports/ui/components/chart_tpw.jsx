import React from 'react';
import Recharts from 'recharts';
import moment from 'moment';
import PropTypes from 'prop-types';


const {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, ResponsiveContainer,
} = Recharts;


const styles = {
  label: {
    fontSize: '1em',
    fontWeight: 'bold',
    paddingTop: '20px',
  },
};

class ChartTPW extends React.PureComponent {
  render() {
    // si pas de ticket dans la base
    if (this.props.tickets.length === 0) {
      return (
        <div>Pas de vente pour cette période</div>
      );
    }

    return (
      <ResponsiveContainer>
        <BarChart
          data={this.props.tickets}
          margin={{
            top: 5, right: 20, left: 10, bottom: 5,
          }}
        >
          <XAxis dataKey="_id" name="days" tickFormatter={tick => moment(tick, 'E').format('dddd')}>
            <Label value="days" position="bottom" style={styles.label} />
          </XAxis>
          <YAxis type="number" allowDecimals={false}>
            <Label angle={270} position="left" value="tickets" style={styles.label} />
          </YAxis>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip labelFormatter={day => moment(day, 'E').format('dddd')} />
          <Bar dataKey="sum" fill="#f4c542" name="number of tickets" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

ChartTPW.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default ChartTPW;
