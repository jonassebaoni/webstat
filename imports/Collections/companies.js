import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

const Companies = new Mongo.Collection('companies');

export default Companies;
