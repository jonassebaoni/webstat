import React from 'react';
import Global1 from '../components/global_1';
import Global2 from '../components/global_2';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-flexbox-grid';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }
  handleChange(selectedOption) {
    this.setState({ query: selectedOption });
    console.log(`id selected: ${selectedOption.label}`);
    console.log(`value: ${selectedOption.value}`);
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="layout">
          <Grid fluid>
            <Row>
              <Col xs>
                <h1> total number of tickets per attraction </h1>
                <Global1/>
              </Col>
              <Col xs>
                  <h1> Graph 2 </h1>
                <Select
                  name="id selected"
                  value={this.state.query}
                  onChange={this.handleChange.bind(this)}
                  options= {this.loadOptions(this.props.tickets)}
                />
                  <Global2 query={this.state.query}/>
              </Col>
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
