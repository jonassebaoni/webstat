/**
 * Created by alexis_moreau on 05/01/2017.
 */
import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import Tickets from '../../Collections/tickets';

class WebStat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log(this.props.id);
        if (!this.props.ready) {
            return (
                <div>chargement</div>
            )
        }
        return (
            <div>
                <h1>Statistics</h1>
                <h2>{this.props.ticket._id}</h2>
            </div>
        );
    }
}

export default createContainer(({id}) => {
    const handle = Meteor.subscribe('tickets');
    return {
        ready: handle.ready(),
        ticket: Tickets.findOne(id)
    }
}, WebStat);
