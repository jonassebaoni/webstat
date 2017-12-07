import {Meteor} from 'meteor/meteor';
import {ReactiveAggregate} from 'meteor/jcbernack:reactive-aggregate';
import Tickets from '../../imports/Collections/tickets';
import {TicketsAggregated, YearAggregated} from "../../imports/Collections/ticketsAggregated";

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

Meteor.publish("ticketsYear", function () {
    ReactiveAggregate(this, Tickets, [
        {
            $group: {
                _id: {$year: "$passingTime"},
                attraction: {$push: "idCompany"},
            }
        },
        {
            $sort: {sum : -1}
        },
        {
            $limit: 15
        }], {clientCollection: "yearAggregated"});
});

Meteor.publish("ticketsMonth", function () {
    ReactiveAggregate(this, Tickets, [
        {
            $group: {
                _id: {$month: "$passingTime"},
                attraction: {$push: "idCompany"},
            }
        },
        {
            $sort: {sum : -1}
        },
        {
            $limit: 15
        }], {clientCollection: "monthAggregated"});
});