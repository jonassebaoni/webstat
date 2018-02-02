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
Meteor.publish("ticketsMonthly", function (companySelected, yearSelected) {
    ReactiveAggregate(this, Tickets, [

        {
            $project: {
                year: {
                    $year: "$passingTime"
                },
                month: {
                    $month: "$passingTime"
                },
                idCompany: 1,
            }
        },
        {
            $match: {
                idCompany: companySelected,
                year: yearSelected,
            }
        },
        {
            $group: {
                _id: "$month",
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
Meteor.publish("ticketsWeekly", function (companySelected, yearSelected, weekSelected) {
    ReactiveAggregate(this, Tickets, [
        {
            $project: {
                year: {
                    $year: "$passingTime"
                },
                week: {
                    $week: "$passingTime"
                },
                day: {
                    $dayOfWeek: "$passingTime"
                },
                passingTime: 1,
                idCompany: 1
            }
        },

        {
            $match: {
                idCompany: companySelected, year: yearSelected, week: weekSelected
            }
        },
        {
            $group: {
                _id: "$day",
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
    getTicketsByWeek(filter) {

        let group = {
            _id: day,
            total: {
                $sum: 1
            }
        };

        let ticketsFiltered = Tickets.aggregate(
            { $project: project},
            { $match: {idCompany: filter, year: 2018, month: 3}},
            { $group: group },
            { $sort: {_id: 1} }
        );

        return ticketsFiltered;
    },
    getTicketsByDaysOfWeek() {

        let project = {
            year: {
                $year: "$passingTime"
            },
            month: {
                $month: "$passingTime"
            },
            day: {
              $dayOfMonth: "$passingTime"
            },
            passingTime: 1,
            idCompany: 1
        };

        let group = {
            _id: "$day",
            total: {
                $sum: 1
            }
        };

        let ticketsFiltered = Tickets.aggregate(
            { $project: project},
            { $match: {idCompany: "WsfwmSogru3CpzsHd", year: 2018, month: 1 }},
            { $group: group },
            { $sort: {_id: 1} }
        );

        ticketsFiltered.sort(function(a,b) { return a._id.day - b._id.day;});

        return ticketsFiltered;
    },

});





