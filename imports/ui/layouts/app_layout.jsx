import React from 'react';

export default class AppLayout extends React.Component {
  render() {
    return (
      <div id="content">
        {this.props.content}
      </div>
    );
  }
}
