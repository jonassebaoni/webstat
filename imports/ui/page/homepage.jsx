import React from 'react';
import Chart1 from '../components/chart1.jsx';
import Graph3 from '../components/graph2-3.jsx';
import Graph4 from '../components/graph4.jsx';
import Graph5 from '../components/graph5.jsx';
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
                                <Chart1 options={this.props.companies}/>
                            </Col>
                            <Col xs={6}>
                                <h1> Evolution of tickets sold over the year </h1>
                                <Graph3 options={this.props.companies}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <h1>Evolution of tickets sold over the current week </h1>
                                <Graph4 options={this.props.companies}/>
                            </Col>
                            <Col xs={6}>
                                <h1> Evolution of tickets sold over the day</h1>
                                <Graph5 options={this.props.companies} />
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
