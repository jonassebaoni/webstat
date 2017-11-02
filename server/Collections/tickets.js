import {Meteor} from 'meteor/meteor';
import Tickets from '../../imports/Collections/tickets';

Meteor.publish('tickets', () => {
    // if (admin)
    return Tickets.find({});
    //else return false
});
