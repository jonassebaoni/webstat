import {Meteor} from 'meteor/meteor';
import Tickets from '../../imports/Collections/tickets';

Meteor.publish('tickets', () => {
    // if (admin)
    return Tickets.find({});
    //else return false
});

Meteor.publish("ticketsTotal", function () {
    ReactiveAggregate(this, Tickets, [{
        $group: {
            _id: "$idCompany",
            sum: {$sum: 1}
        }

    }],{ clientCollection: "ticketsAggregation" });
});
