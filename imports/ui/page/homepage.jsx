import React from 'react';
import WebStat from '../../../imports/ui/components/webstat';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-flexbox-grid';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="layout">
          <Grid fluid>
            <Row>
              <Col xs>
                <h1> total number of tickets per attraction </h1>
                <WebStat/>
              </Col>
              {/*<Col xs>
                              <h1>Graphic 2</h1>
                              <WebStat/>
                          </Col>*/}
            </Row>
            {/*<Row>
                          <Col xs>
                              <h1>Graphic 3</h1>
                              <WebStat/>
                          </Col>
                          <Col xs>
                              <h1>Graphic 4</h1>
                              <WebStat/>
                          </Col>
                      </Row>*/}
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default HomePage;
