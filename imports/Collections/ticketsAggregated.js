import {Mongo} from 'meteor/mongo';

const TicketsAggregated = new Mongo.Collection("ticketsAggregated");
const TicketsMonthly = new Mongo.Collection("ticketsMonthly");

export {TicketsAggregated, TicketsMonthly};