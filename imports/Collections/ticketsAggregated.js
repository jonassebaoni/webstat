import {Mongo} from 'meteor/mongo';

const TicketsAggregated = new Mongo.Collection("ticketsAggregated");
const YearAggregated = new Mongo.Collection("yearAggregated");

export {TicketsAggregated, YearAggregated};