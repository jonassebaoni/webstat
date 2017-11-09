import {Mongo} from 'meteor/mongo';

const TicketsAggregated = new Mongo.Collection("ticketsAggregated");

export default TicketsAggregated;