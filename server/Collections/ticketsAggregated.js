import { Meteor } from 'meteor/meteor';
import { ReactiveAggregate } from 'meteor/jcbernack:reactive-aggregate';
import Tickets from '../../imports/Collections/tickets';

// Calcule le nombre de tickets total par attraction et par années
Meteor.publish('ticketsAggregated', function (yearSelected) {
  ReactiveAggregate(this, Tickets, [
    {
      $project: {
        year: {
          $year: '$passingTime',
        },
        idCompany: 1,
      },
    },
    {
      $match: {
        year: yearSelected,
      },
    },
    {
      $group: {
        _id: '$idCompany',
        sum: { $sum: 1 },
      },
    },
    {
      $sort: { sum: -1 },
    },

  ], { clientCollection: 'ticketsAggregated' });
});

// Groupe les tickets par mois et par attraction sélectionnée
Meteor.publish('ticketsMonthly', function (companySelected, yearSelected) {
  ReactiveAggregate(this, Tickets, [

    {
      $project: {
        year: {
          $year: '$passingTime',
        },
        month: {
          $month: '$passingTime',
        },
        idCompany: 1,
      },
    },
    {
      $match: {
        idCompany: companySelected,
        year: yearSelected,
      },
    },
    {
      $group: {
        _id: '$month',
        sum: { $sum: 1 },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    }], { clientCollection: 'ticketsMonthly' });
});

// Groupe les tickets par jours de la semaine et par attraction sélectionnée
Meteor.publish('ticketsWeekly', function (companySelected, yearSelected, weekSelected) {
  ReactiveAggregate(this, Tickets, [
    {
      $project: {
        year: {
          $year: '$passingTime',
        },
        week: {
          $week: '$passingTime',
        },
        day: {
          $dayOfWeek: '$passingTime',
        },
        passingTime: 1,
        idCompany: 1,
      },
    },

    {
      $match: {
        idCompany: companySelected, year: yearSelected, week: weekSelected,
      },
    },
    {
      $group: {
        _id: '$day',
        sum: { $sum: 1 },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    }], { clientCollection: 'ticketsWeekly' });
});

// Groupe les tickets par heures de la journée et par attraction sélectionnée
Meteor.publish('ticketsDaily', function (companySelected, date, range) {
  ReactiveAggregate(this, Tickets, [
    {
      $project: {
        year: {
          $year: '$passingTime',
        },
        month: {
          $month: '$passingTime',
        },
        day: {
          $dayOfMonth: '$passingTime',
        },
        hours: {
          $hour: '$passingTime',
        },
        passingTime: 1,
        idCompany: 1,
      },
    },

    {
      $match: {
        idCompany: companySelected,
        year: date.years,
        month: date.months + 1,
        day: date.date,
        hours: { $gte: range[0], $lte: range[1] },
      },
    },
    {
      $group: {
        _id: '$hours',
        sum: { $sum: 1 },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    }], { clientCollection: 'ticketsDaily' });
});

// Groupe les tickets par conditions météo
Meteor.publish('ticketsWeather', function () {
  ReactiveAggregate(this, Tickets, [
    {
      $group: {
        _id: '$skycode',
        sum: { $sum: 1 },
      },
    }], { clientCollection: 'ticketsWeather' });
});

