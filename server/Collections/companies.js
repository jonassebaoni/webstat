import { Meteor } from 'meteor/meteor';
import Companies from '../../imports/Collections/companies';


Meteor.publish('companies', () => Companies.find());
