import {Meteor} from 'meteor/meteor';
import Tickets from '../../imports/Collections/tickets';

Meteor.publish('tickets', () => {
  // if (admin)
  return Tickets.find({}, {limit: 100});
  //else return false
});
