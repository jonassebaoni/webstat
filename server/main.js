import { Restivus } from 'meteor/nimble:restivus';
import Tickets from '../imports/collections/tickets';
import { getWeekOfYear } from '../imports/utils/date';


// Global API configuration
const Api = new Restivus({
  useDefaultAuth: false,
  prettyJson: true,
});

Api.swagger = {
  meta: {
    swagger: '2.0',
    info: {
      version: '1.0.0',
      title: 'Morman API',
      description: 'API de gestion d\'attraction',
      contact: {
        name: 'Gary Perez',
      },
      license: {
        name: 'MIT',
      },
    },
  },
  definitions: {
    Ticket: {
      _id: 'string',
      number: 'number',
      idPerson: 0,
      idCompany: 'string',// Api.addCollection(TicketsDaily);
      idWaitList: 'string',
      passingTime: 'date',
      passed: 'boolean',
      skycode: 'number',
      lastUpdated: 'date',
      createdAt: 'date',
    },
    // Schema definitions for $refs, check spec http://swagger.io/specification/
    // Required for body parameters
  },
  params: {
    // Parameter object definitions to be used in endpoint configurations
    // Path and body parameter types supported in v0.2.0
    petId: {
      name: 'id',
      in: 'path',
      description: 'Pet ID',
      required: true,
      type: 'string',
    },
  },
  tags: {
    // Swagger UI tag variables to be used in endpoint grouping
    pet: 'Pets',
  },
};

Api.addCollection(Tickets, {
  endpoints: {
    getAll: {
      swagger: {
        tags: [
        ],
        description: 'Returns all tickets',
        responses: {
          200: {
            description: 'Success',
          },
        },
      },
    },
    get: {
      swagger: {
        tags: [
        ],
        description: 'Returns a ticket with ID',
        parameters: [
        ],
        responses: {
          200: {
            description: 'Success',
          },
        },
      },
    },
  },
});

Api.addRoute('ticketsInfo', {
  get: () => {
    const pipeline = [
      {
        $project: {
          day: {
            $dayOfYear: '$passingTime',
          },
          passingTime: 1,
          skycode: 1,
        },
      },
      {
        $group: {
          _id: '$day',
          time: { $first: '$skycode' },
          sum: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ];

    const result = Tickets.aggregate(pipeline);

    return {
      status: 'success',
      data: result,
    };
  },
});

// Calcule le nombre de tickets total par attraction et par années
Api.addRoute('ticketsAggregated/:year', {
  get: function () {
    const selectedYear = parseInt(this.urlParams.year, 10);

    const pipeline = [
      {
        $project: {
          year: {
            $year: '$passingTime',
          },
          idCompany: 2,
        },
      },
      {
        $match: {
          year: selectedYear,
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
    ];

    const result = Tickets.aggregate(pipeline);

    return {
      status: 'success',
      data: result,
    };
  },
});

Api.addRoute('ticketsMonthly/:company', {
  get: function () {
    const selectedCompany = this.urlParams.company;
    const selectedYear = this.queryParams.year ?
      parseInt(this.queryParams.year, 10) : Date.now().getFullYear();

    const pipeline = [
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
          idCompany: selectedCompany,
          year: selectedYear,
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
      },
    ];

    const result = Tickets.aggregate(pipeline);

    return {
      status: 'success',
      data: result,
    };
  },
});

// Groupe les tickets par jours de la semaine et par attraction sélectionnée
Api.addRoute('ticketsWeekly/:company', {
  get: function () {
    const now = new Date();

    const selectedCompany = this.urlParams.company;
    const selectedYear = this.queryParams.year ?
      parseInt(this.queryParams.year, 10) : now.getFullYear();
    const selectedWeek = this.queryParams.week ?
      parseInt(this.queryParams.week, 10) : getWeekOfYear(now);

    const pipeline = [
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
          idCompany: selectedCompany, year: selectedYear, week: selectedWeek,
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
      },
    ];

    const result = Tickets.aggregate(pipeline);

    return {
      status: 'success',
      data: result,
    };
  },
});

// Groupe les tickets par jours de la semaine et par attraction sélectionnée
Api.addRoute('ticketsDaily/:company', {
  get: function () {
    const selectedCompany = this.urlParams.company;
    const selectedDate = new Date(this.queryParams.date || undefined);

    const pipeline = [
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
          idCompany: selectedCompany,
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDay(),
          hours: { $gte: 0, $lte: 24 },
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
      },
    ];

    const result = Tickets.aggregate(pipeline);

    return {
      status: 'success',
      data: result,
    };
  },
});

// Groupe les tickets par conditions météo
Api.addRoute('ticketsWeather', {
  get: () => {
    const pipeline = [
      {
        $group: {
          _id: '$skycode',
          sum: { $sum: 1 },
        },
      },
    ];

    const result = Tickets.aggregate(pipeline);

    return {
      status: 'success',
      data: result,
    };
  },
});

Api.addSwagger('swagger.json');
