import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

const Tickets = new Mongo.Collection('tickets');

Meteor.methods({
   insertData() {
     Tickets.insert({
       _id : "67774jtYxTLwAQ2bj",
       number : 1,
       idPerson : "",
       idCompany : "7SrAcFawQk6MqhsWQ",
       idWaitList : "CpWMYRgNDtmshkk7k",
       passingTime : "2017-05-18T09:42:11.450Z",
       passed : true,
       lastUpdated : "2017-05-18T09:22:11.450Z",
       createdAt : "2017-05-18T09:22:11.450Z",
     });
   }
});

export default Tickets;
//Meteor.call('insertData');
