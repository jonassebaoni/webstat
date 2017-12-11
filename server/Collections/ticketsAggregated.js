import {Meteor} from 'meteor/meteor';
import {ReactiveAggregate} from 'meteor/jcbernack:reactive-aggregate';
import Tickets from '../../imports/Collections/tickets';
import {TicketsAggregated, TicketsMonthly} from "../../imports/Collections/ticketsAggregated";

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

