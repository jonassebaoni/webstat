import {Mongo} from 'meteor/mongo';

const TicketsAggregated = new Mongo.Collection("ticketsAggregated");
const YearAggregated = new Mongo.Collection("yearAggregated");
const MonthAggregated = new Mongo.Collection("monthAggregated");

export {TicketsAggregated, YearAggregated, MonthAggregated};