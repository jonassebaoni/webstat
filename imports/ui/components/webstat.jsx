import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import Tickets from '../../Collections/tickets';

class WebStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.ready) {
      return (
        <div>chargement</div>
      )
    }
    if (!this.props.ticket) { // si pas de ticket dans la base
      return (
        <div>pas de ticket disponible</div>
      )
    }
    return ( // on affiche le ticket
      <div>
        <h1>Statistics</h1>
        <h2>{this.props.ticket._id}</h2>
        <h2>{this.props.ticket.number}</h2>
        <h2>{this.props.ticket.passingTime}</h2>
        <h2>{this.props.ticket.passed}</h2>
        <h2>{this.props.ticket.createdAt}</h2>
      </div>
    );
  }
}

export default withTracker(({id}) => {
  const handle = Meteor.subscribe('tickets');
  return {
    ready: handle.ready(),
    ticket: Tickets.findOne(id) // query
  }
})(WebStat);
