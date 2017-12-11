import {Meteor} from 'meteor/meteor';
import {ReactiveAggregate} from 'meteor/jcbernack:reactive-aggregate';
import Tickets from '../../imports/Collections/tickets';
import {TicketsAggregated, TicketsMonthly, TicketsWeekly, TicketsDaily} from "../../imports/Collections/ticketsAggregated";

// Compute the number of tickets sold per attraction
Meteor.publish("ticketsAggregated", function () {
  ReactiveAggregate(this, Tickets, [
      {
        $group: {
          _id: "$idCompany",
          sum: {$sum: 1}
          }
      },
      {
        $sort: {sum : -1}
      },
      {
        $limit: 15
      }], {clientCollection: "ticketsAggregated"});
});

// Compute the number of tickets sold every month for a chosen date
Meteor.publish("ticketsMonthly", function (yearSelected) {
    ReactiveAggregate(this, Tickets, [
        {
            $project: {
                "year": {$year: "$passingTime"},
                "month": {$month: "$passingTime"},

            }
        },
        {
            $match: {
                "year": yearSelected
            }
        },
        {
            $group: {
                "_id": "$month",
                "sum": {$sum: 1}
            }
        },
        {
            $sort: {"_id" : 1}
        },
        {
            $limit: 15
        }], {clientCollection: "ticketsMonthly"});
});

// Compute the number of tickets sold every week for a chosen date
Meteor.publish("ticketsMonthly", function (yearSelected, monthSelected) {
    ReactiveAggregate(this, Tickets, [
        {
            $project: {
                "year": {$year: "$passingTime"},
                "month": {$month: "$passingTime"},
                "week": {$week: "$passingTime"}

            }
        },
        {
            $match: {
                "year": yearSelected,
                "month": monthSelected
            }
        },
        {
            $group: {
                "_id": "$week",
                "sum": {$sum: 1}
            }
        },
        {
            $sort: {"_id" : 1}
        },
        {
            $limit: 15
        }], {clientCollection: "ticketsWeekly"});
});


// Compute the number of tickets sold every day for a chosen date
Meteor.publish("ticketsMonthly", function (yearSelected, monthSelected, weekSelected) {
    ReactiveAggregate(this, Tickets, [
        {
            $project: {
                "year": {$year: "$passingTime"},
                "month": {$month: "$passingTime"},
                "week": {$week: "$passingTime"},
                "day": {$dayOfWeek: "$passingTime"}

            }
        },
        {
            $match: {
                "year": yearSelected,
                "month": monthSelected,
                "week": weekSelected,
            }
        },
        {
            $group: {
                "_id": "$day",
                "sum": {$sum: 1}
            }
        },
        {
            $sort: {"_id" : 1}
        },
        {
            $limit: 15
        }], {clientCollection: "ticketsDaily"});
});
