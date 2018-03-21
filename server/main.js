import { Restivus } from 'meteor/nimble:restivus';
import Tickets from '../imports/collections/tickets';


// Global API configuration
const Api = new Restivus({
  version: 'v1',
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
      idCompany: 'string',
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

// Api.addCollection(TicketsDaily);

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

Api.addSwagger('swagger.json');
