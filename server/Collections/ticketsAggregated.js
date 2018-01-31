import {Meteor} from 'meteor/meteor';
import {ReactiveAggregate} from 'meteor/jcbernack:reactive-aggregate';
import Tickets from '../../imports/Collections/tickets';
import {TicketsAggregated, TicketsMonthly, TicketsWeekly, TicketsDaily} from "../../imports/Collections/ticketsAggregated";

// Calcule le nombre de tickets total par attraction
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

// Groupe les tickets par mois et par attraction sélectionnée
Meteor.publish("ticketsMonthly", function (companySelected) {
    ReactiveAggregate(this, Tickets, [

        {
            $match: {
                idCompany: companySelected
            }
        },
        {
            $group: {
                _id: {$month: "$passingTime"},
                sum: {$sum: 1}
            },
        } ,
        {
            $sort: {
                _id: 1
            }
        }], {clientCollection: "ticketsMonthly"});
});

// Groupe les tickets par semaine et par attraction sélectionnée
Meteor.publish("ticketsWeekly", function (companySelected) {
    ReactiveAggregate(this, Tickets, [

        {
            $match: {
                idCompany: companySelected,
            }
        },
        {
            $group: {
                _id: {$week: "$passingTime"},
                sum: {$sum: 1}
            },
        } ,
        {
            $sort: {
                _id: 1
            }
        }], {clientCollection: "ticketsWeekly"});
});



Meteor.methods({
   getTicketsByMonths(filter) {
       let group = {
           _id: {
               month: {$month: "$passingTime"}
           },
           total: {
               $sum: 1
           }
       };

       let ticketsFiltered = Tickets.aggregate(
           { $match: {idCompany: filter}},
           { $group: group },
           { $sort: {_id: 1} }
       );

       ticketsFiltered.sort(function(a,b) { return a._id.month - b._id.month;});

       return ticketsFiltered;
   },
    getTicketsByWeeks(filter) {
        let group = {
            _id: {
                week: {$week: "$passingTime"}
            },
            total: {
                $sum: 1
            }
        };

        let ticketsFiltered = Tickets.aggregate(
            { $match: {idCompany: filter}},
            { $group: group },
            { $sort: {_id: 1} }
        );

        ticketsFiltered.sort(function(a,b) { return a._id.week - b._id.week;});

        return ticketsFiltered;
    }
});



