import { Meteor } from 'meteor/meteor';
import Companies from '../../imports/collections/companies';


Meteor.publish('companies', () => Companies.find());
