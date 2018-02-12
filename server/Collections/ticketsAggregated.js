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

// Groupe les tickets par jours de la semaine et par attraction sélectionnée
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

// Groupe les tickets par heures de la journée et par attraction sélectionnée
Meteor.publish("ticketsDaily", function (companySelected, date) {
    ReactiveAggregate(this, Tickets, [
        {
            $project: {
                year: {
                    $year: "$passingTime"
                },
                month: {
                    $month: "$passingTime"
                },
                day: {
                    $dayOfMonth: "$passingTime"
                },
                hours: {
                    $hour: "$passingTime"
                },
                passingTime: 1,
                idCompany: 1
            }
        },

        {
            $match: {
                idCompany: companySelected, year: date["years"], month: date["months"]+1, day: date["date"]
            }
        },
        {
            $group: {
                _id: "$hours",
                sum: {$sum: 1}
            },
        } ,
        {
            $sort: {
                _id: 1
            }
        }], {clientCollection: "ticketsDaily"});
});








