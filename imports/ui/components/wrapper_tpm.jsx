import React from 'react';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ChartBarTPM from './chart_bar_tpm.jsx';
import ChartLineTPM from './chart_line_tpm.jsx';


const styles = {
  firstButton: {
    display: 'inline-block',
  },
  secondButton: {
    display: 'inline-block',
    marginLeft: 25,
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 6,
  },
};

class WrapperTPM extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBar: false,
    };
    this.handleLineClick = this.handleLineClick.bind(this);
    this.handleBarClick = this.handleBarClick.bind(this);
  }

  handleBarClick() {
    this.setState({ isBar: true });
  }

  handleLineClick() {
    this.setState({ isBar: false });
  }

  render() {
    return (
      <div className="graphContainer">
        <h2> Evolution of tickets sold over the year </h2>
        <div className="graphInputContainer">
          <RadioButtonGroup
            name="select chart style"
            defaultSelected="line"
            style={styles.radioGroup}
          >
            <RadioButton
              value="line"
              label="Line"
              onClick={this.handleLineClick}
              style={styles.firstButton}
            />
            <RadioButton
              value="bar"
              label="Bar"
              onClick={this.handleBarClick}
              style={styles.secondButton}
            />
          </RadioButtonGroup>
        </div>

        <div className="graph">
          {this.state.isBar === true ?
            <ChartBarTPM
              tickets={this.props.tickets}
            />
            :
            <ChartLineTPM
              tickets={this.props.tickets}
            />
          }
        </div>
      </div>
    );
  }
}

WrapperTPM.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default WrapperTPM;
