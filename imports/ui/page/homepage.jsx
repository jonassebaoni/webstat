import 'react-select/dist/react-select.css';
import 'rc-slider/assets/index.css';
import Promise from 'bluebird';
import { Col, Grid, Row } from 'react-flexbox-grid';
import CircularProgress from 'material-ui/CircularProgress';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import makeCancelable from 'makecancelable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Companies from '../../collections/companies';
import ChartGlobalTPA from '../components/chart_global_tpa.jsx';
import ChartGlobalWeather from '../components/chart_global_weather.jsx';
import WrapperTPM from '../components/wrapper_tpm.jsx';
import WrapperTPW from '../components/wrapper_tpw.jsx';
import WrapperTPD from '../components/wrapper_tpd.jsx';
import ConfigurationBar from '../components/configuration_bar.jsx';
import { getWeekOfYear } from '../../utils/date';
import PredictionZone from '../components/prediction_zone.jsx';
import API from '../../api';


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
      ready: false,
      selectedDate: new Date(),
      selectedCompany: null,
      selectedType: true, // Boolean (true = stat, false = prev)
      ticketsTPA: [],
      ticketsTPM: [],
      ticketsTPW: [],
      ticketsTPD: [],
    };

    this.getChartsData = this.getChartsData.bind(this);
    this.handleDateSelected = this.handleDateSelected.bind(this);
    this.handleCompanySelected = this.handleCompanySelected.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // On selectionne la première compagnie lorsque l'on reçoit pour la première fois les compagnies
    if (nextProps.ready && !this.state.selectedCompany) {
      const firstCompany = {
        value: nextProps.companies[1]._id,
        label: nextProps.companies[1].name,
      };
      this.setState({ selectedCompany: firstCompany }, () => {
        this.cancelFetch = makeCancelable(
          this.getChartsData(['TPA', 'TPM', 'TPW', 'TPD']),
          res => this.setState({
            ready: true,
            ticketsTPA: res[0].data.data,
            ticketsTPM: res[1].data.data,
            ticketsTPW: res[2].data.data,
            ticketsTPD: res[3].data.data,
          }),
          error => console.error(error),
        );
      });
    }
  }

  componentWillUnmount() {
    this.cancelFetch();
  }

  getChartsData(chartsToFetch) {
    const promises = [];

    if (chartsToFetch.indexOf('TPA') !== -1) {
      const tpaPromise = API.getTicketsTPA(this.state.selectedDate.getFullYear());
      promises.push(tpaPromise);
    }

    if (chartsToFetch.indexOf('TPM') !== -1) {
      const tpmPromise = API.getTicketsTPM(
        this.state.selectedCompany.value,
        this.state.selectedDate.getFullYear(),
      );
      promises.push(tpmPromise);
    }

    if (chartsToFetch.indexOf('TPW') !== -1) {
      const tpwPromise = API.getTicketsTPW(
        this.state.selectedCompany.value,
        this.state.selectedDate.getFullYear(),
        getWeekOfYear(this.state.selectedDate),
      );
      promises.push(tpwPromise);
    }

    if (chartsToFetch.indexOf('TPD') !== -1) {
      const tpdPromise = API.getTicketsTPD(
        this.state.selectedCompany.value,
        this.state.selectedDate,
      );
      promises.push(tpdPromise);
    }

    return Promise.all(promises);
  }

  handleDateSelected(event, date) {
    this.setState({ selectedDate: date }, () => {
      this.cancelFetch = makeCancelable(
        this.getChartsData(['TPA', 'TPM', 'TPW', 'TPD']),
        res => this.setState({
          ticketsTPA: res[0].data.data,
          ticketsTPM: res[1].data.data,
          ticketsTPW: res[2].data.data,
          ticketsTPD: res[3].data.data,
        }),
        error => console.error(error),
      );
    });
  }

  handleCompanySelected(company) {
    this.setState({ selectedCompany: company }, () => {
      this.cancelFetch = makeCancelable(
        this.getChartsData(['TPM', 'TPW', 'TPD']),
        res => this.setState({
          ticketsTPM: res[0].data.data,
          ticketsTPW: res[1].data.data,
          ticketsTPD: res[2].data.data,
        }),
        error => console.error(error),
      );
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        {this.props.ready && this.state.ready && this.state.selectedCompany ?
          <div id="homePage">
            <h1>Parc analysis</h1>

            <ConfigurationBar
              selectedDate={this.state.selectedDate}
              handleDateSelected={this.handleDateSelected}
              selectedCompany={this.state.selectedCompany}
              handleCompanySelected={this.handleCompanySelected}
              companies={this.props.companies}
              selectedType={this.state.selectedType}
              handleDisplayTypeChanged={
                (e, displayType) => this.setState({ selectedType: displayType })}
            />

            {/* Si statistique */}
            {this.state.selectedType === true ?
              <Grid fluid spacing={styles.grid.spacing}>
                <Row style={styles.row}>
                  <Col xs={4} style={styles.col4}>
                    <ChartGlobalTPA
                      tickets={this.state.ticketsTPA}
                      options={this.props.companies}
                    />
                  </Col>
                  <Col xs={4} style={styles.col4}>
                    <ChartGlobalWeather />
                  </Col>
                  <Col xs={4} style={styles.col4}>
                    <WrapperTPM
                      tickets={this.state.ticketsTPM}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} style={styles.col6}>
                    <WrapperTPW
                      tickets={this.state.ticketsTPW}
                    />
                  </Col>
                  <Col xs={6} style={styles.col6}>
                    <WrapperTPD
                      tickets={this.state.ticketsTPD}
                    />
                  </Col>
                </Row>
              </Grid>
              :
              <Grid fluid spacing={styles.grid.spacing}>
                <Row style={styles.row}>
                  <Col xs={4} style={styles.col4}>
                    <PredictionZone />
                  </Col>
                </Row>
              </Grid>
            }
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
