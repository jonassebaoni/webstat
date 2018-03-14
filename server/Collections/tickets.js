import { Meteor } from 'meteor/meteor';
import Tickets from '../../imports/Collections/tickets';


Meteor.publish('tickets', () => Tickets.find({}, { limit: 100 }));
