import { Meteor } from 'meteor/meteor';
import Tickets from '../../imports/collections/tickets';


Meteor.publish('tickets', () => Tickets.find({}, { limit: 100 }));
