import { Mongo } from 'meteor/mongo';


const TicketsAggregated = new Mongo.Collection('ticketsAggregated');
const TicketsMonthly = new Mongo.Collection('ticketsMonthly');
const TicketsWeekly = new Mongo.Collection('ticketsWeekly');
const TicketsDaily = new Mongo.Collection('ticketsDaily');
const TicketsWeather = new Mongo.Collection('ticketsWeather');

export { TicketsAggregated, TicketsMonthly, TicketsWeekly, TicketsDaily, TicketsWeather };
