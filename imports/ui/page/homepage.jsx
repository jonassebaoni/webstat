import React from 'react';
import WebStat from '../../../imports/ui/components/webstat';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="layout">
        <h1>Statistics</h1>
        <WebStat/>
      </div>
    );
  }
}

export default HomePage;
