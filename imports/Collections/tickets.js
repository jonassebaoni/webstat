import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

const Tickets = new Mongo.Collection('tickets');

export default Tickets;


