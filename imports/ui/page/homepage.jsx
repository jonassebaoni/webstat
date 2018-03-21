import 'react-select/dist/react-select.css';
import 'rc-slider/assets/index.css';
import { Col, Grid, Row } from 'react-flexbox-grid';
import CircularProgress from 'material-ui/CircularProgress';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Companies from '../../collections/companies';
import WrapperGlobalTPA from '../components/wrapper_global_tpa.jsx';
import ChartGlobalWeather from '../components/chart_global_weather.jsx';
import WrapperTPM from '../components/wrapper_tpm.jsx';
import WrapperTPW from '../components/wrapper_tpw.jsx';
import WrapperTPD from '../components/wrapper_tpd.jsx';
import ConfigurationBar from '../components/configuration_bar.jsx';


const styles = {
  row: {
    marginBottom: 16,
  },
  col4: {
    display: 'flex',
    height: '35vh',
  },
  col6: {
    display: 'flex',
    height: '45vh',
  },
  grid: {
    spacing: 0,
  },
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      selectedCompany: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    // On selectionne la première compagnie lorsque l'on reçoit pour la première fois les compagnies
    if (nextProps.ready && !this.state.selectedCompany) {
      const firstCompany = {
        value: nextProps.companies[0]._id,
        label: nextProps.companies[0].name,
      };
      this.setState({ selectedCompany: firstCompany });
    }
  }

  render() {
    const selectedYear = this.state.selectedDate.getFullYear();
    return (
      <MuiThemeProvider>
        {this.props.ready && this.state.selectedCompany ?
          <div id="homePage">
            <h1>Parc analysis</h1>

            <ConfigurationBar
              selectedDate={this.state.selectedDate}
              handleDateSelected={(event, date) => this.setState({ selectedDate: date })}
              selectedCompany={this.state.selectedCompany}
              handleCompanySelected={company => this.setState({ selectedCompany: company })}
              companies={this.props.companies}
            />

            <Grid fluid spacing={styles.grid.spacing}>
              <Row style={styles.row}>
                <Col xs={4} style={styles.col4}>
                  <WrapperGlobalTPA
                    selectedYear={selectedYear}
                    options={this.props.companies}
                  />
                </Col>
                <Col xs={4} style={styles.col4}>
                  <ChartGlobalWeather />
                </Col>
                <Col xs={4} style={styles.col4}>
                  <WrapperTPM
                    selectedYear={selectedYear}
                    selectedCompany={this.state.selectedCompany.value}
                    options={this.props.companies}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={6} style={styles.col6}>
                  <WrapperTPW
                    selectedCompany={this.state.selectedCompany.value}
                  />
                </Col>
                <Col xs={6} style={styles.col6}>
                  <WrapperTPD
                    selectedCompany={this.state.selectedCompany.value}
                    options={this.props.companies}
                  />
                </Col>
              </Row>
            </Grid>
          </div>
          :
          <div className="loader">
            <CircularProgress size={80} thickness={6} />
          </div>
        }
      </MuiThemeProvider>
    );
  }
}

HomePage.defaultProps = {
  ready: false,
};
HomePage.propTypes = {
  ready: PropTypes.bool,
  companies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default withTracker(() => {
  const handle = Meteor.subscribe('companies');
  return {
    ready: handle.ready(),
    companies: Companies.find().fetch(),
  };
})(HomePage);
