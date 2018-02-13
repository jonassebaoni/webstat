import React from 'react';
import ChartGlobalTPA from '../components/chart_global_tpa.jsx';
import ChartGlobalWeather from '../components/chart_global_weather.jsx';
import WrapperTPM from '../components/wrapper_tpm.jsx';
import WrapperTPW from '../components/wrapper_tpw.jsx';
import WrapperTPD from '../components/wrapper_tpd.jsx';
import {withTracker} from 'meteor/react-meteor-data';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Companies from '../../Collections/companies';
import ToolBar from 'material-ui/Toolbar'


class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(!this.props.ready) {
      return <div>chargement</div>
    }

    else {
        return (
            <MuiThemeProvider>
                <div className="layout">
                    <ToolBar title={"My AppBar"}/>
                    <Grid fluid>
                        <Row>
                            <Col xs={6}>
                                <h1> Number of tickets per attraction </h1>
                                <ChartGlobalTPA options={this.props.companies}/>
                            </Col>
                            <Col xs={6}>
                                <h1> Affluence according to the weather </h1>
                                <ChartGlobalWeather/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <h1> Evolution of tickets sold over the year </h1>
                                <WrapperTPM options={this.props.companies}/>
                            </Col>
                            <Col xs={6}>
                                <h1>Evolution of tickets sold over the current week </h1>
                                <WrapperTPW options={this.props.companies}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <h1> Evolution of tickets sold over the day</h1>
                                <WrapperTPD options={this.props.companies} />
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </MuiThemeProvider>
        );
    }
  }
}

export default withTracker(() => {
  const handle = Meteor.subscribe('companies');
  return {
    ready: handle.ready(),
    companies: Companies.find().fetch(),
  };
})(HomePage);
