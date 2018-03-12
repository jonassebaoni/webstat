import { Col, Grid, Row } from 'react-flexbox-grid';
import CircularProgress from 'material-ui/CircularProgress';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Companies from '../../Collections/companies';
import WrapperGlobalTPA from '../components/wrapper_global_tpa.jsx';
import ChartGlobalWeather from '../components/chart_global_weather.jsx';
import WrapperTPM from '../components/wrapper_tpm.jsx';
import WrapperTPW from '../components/wrapper_tpw.jsx';
import WrapperTPD from '../components/wrapper_tpd.jsx';


const styles = {
  row: {
    marginBottom: 16
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
  render() {
    return (
      <MuiThemeProvider>
        {this.props.ready ?
          <div id="homePage">
            <h1>Parc analysis</h1>

            <Grid fluid spacing={styles.grid.spacing}>
              <Row style={styles.row}>
                <Col xs={4} style={styles.col4}>
                  <WrapperGlobalTPA options={this.props.companies} />
                </Col>
                <Col xs={4} style={styles.col4}>
                  <ChartGlobalWeather />
                </Col>
                <Col xs={4} style={styles.col4}>
                  <WrapperTPM options={this.props.companies} />
                </Col>
              </Row>
              <Row>
                <Col xs={6} style={styles.col6}>
                  <WrapperTPW options={this.props.companies} />
                </Col>
                <Col xs={6} style={styles.col6}>
                  <WrapperTPD options={this.props.companies} />
                </Col>
              </Row>
            </Grid>
          </div>
          :
          <div className="loader">
            <CircularProgress size={80} thickness={6}/>
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
