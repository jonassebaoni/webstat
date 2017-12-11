import {Mongo} from 'meteor/mongo';

const TicketsAggregated = new Mongo.Collection("ticketsAggregated");
const TicketsMonthly = new Mongo.Collection("ticketsMonthly");
const TicketsWeekly = new Mongo.Collection("ticketsWeekly");
const TicketsDaily = new Mongo.Collection("ticketsDaily");

export {TicketsAggregated, TicketsMonthly, TicketsWeekly, TicketsDaily};