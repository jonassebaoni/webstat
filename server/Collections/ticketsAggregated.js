import {Meteor} from 'meteor/meteor';
import {ReactiveAggregate} from 'meteor/jcbernack:reactive-aggregate';
import Tickets from '../../imports/Collections/tickets';

Meteor.publish("ticketsAggregated", function () {
  ReactiveAggregate(this, Tickets, [{
    $group: {
      _id: "$idCompany",
      sum: {$sum: 1}
    }

  }], {clientCollection: "ticketsAggregated"});
});
