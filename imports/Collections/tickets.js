import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

const Tickets = new Mongo.Collection('tickets');

Meteor.methods({
   insertData() {
       console.log('test');
       console.log(Tickets.find().fetch());
   }
});
/*
Meteor.call('insertData');
Meteor.call('insertData', (err, res) => {
    console.log(res);
});*/
