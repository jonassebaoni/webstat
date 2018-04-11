import React from 'react';
import PropTypes from 'prop-types';
import Recharts from 'recharts';


const {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, ResponsiveContainer,
} = Recharts;

const styles = {
  label: {
    fontSize: '0.75em',
    fontWeight: 'bold',
    textAnchor: 'middle',
    height: 15,
  },
};
class ChartGlobalTPA extends React.PureComponent {
  render() {
    // Préparation des tickets pour le graphique
    const tickets = [];
    for (let i = 0; i < this.props.tickets.length; i += 1) {
      const ticket = { ...this.props.tickets[i] };

      for (let j = 0; j < this.props.options.length; j += 1) {
        if (ticket._id === this.props.options[j]._id) {
          ticket.companyName = this.props.options[j].name;
          break;
        }
      }
      tickets.push(ticket);
    }

    return (
      <div className="graphContainer">
        <h2> Number of tickets per attraction </h2>
        <div className="graph">
          {this.props.tickets.length === 0 ?
            <div>Pas de vente pour cette période</div>
            :
            <ResponsiveContainer>
              <BarChart
                data={tickets}
                margin={{
                  top: 5, right: 20, left: 10, bottom: 5,
                }}
              >
                <XAxis dataKey="companyName" name="ID attraction">
                  <Label value="attraction name" position="bottom" style={styles.label} />
                </XAxis>
                <YAxis type="number" allowDecimals={false}>
                  <Label angle={270} position="left" value="total tickets" style={styles.label} />
                </YAxis>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Bar dataKey="sum" fill="#8884d8" name="number of tickets" />
              </BarChart>
            </ResponsiveContainer>
          }
        </div>
      </div>
    );
  }
}

ChartGlobalTPA.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ChartGlobalTPA;
