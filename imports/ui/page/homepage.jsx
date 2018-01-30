import React from 'react';
import Chart1 from '../components/chart1.jsx';
import Graph2 from '../components/graph-2.jsx';
import Graph3 from '../components/graph-3.jsx';
import {withTracker} from 'meteor/react-meteor-data';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Companies from "../../Collections/companies";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    if(!this.props.ready) {
      return <div>chargement</div>
    }
    return (
      <MuiThemeProvider>
        <div className="layout">
          <Grid fluid>
            <Row around="xs">
              <Col xs={4}>
                <h1> Number of tickets per attraction </h1>
                <Chart1 options={this.props.companies}/>
              </Col>
                <Col xs={4}>
                    <h1> Evolution of tickets sold over months </h1>
                    <Graph2 />
                </Col>
            </Row>
            <Row around="xs">
                <Col xs={4}>
                    <h1> Evolution of tickets sold over months </h1>
                    <Graph3 options={this.props.companies}/>
                </Col>
                <Col xs={4}>
                    <h1>Graphic 4</h1>
                </Col>
            </Row>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withTracker(() => {
  const handle = Meteor.subscribe('companies');
  return {
    ready: handle.ready(),
    companies: Companies.find().fetch(),
  };
})(HomePage);
