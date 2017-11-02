import {Meteor} from 'meteor/meteor';

Meteor.startup(() => {
    // Path to project directory
    var appDir = process.env.PWD;
    // Path to server resources
    var appData = appDir + "/server/resources/";
    // Load future from fibers
    var Future = Npm.require("fibers/future");
    // Load exec
    var exec = Npm.require("child_process").exec;

    // Server methods
    Meteor.methods({
        cron_retrieveData: function () {
            // This method call won't return immediately, it will wait for the
            // asynchronous code to finish, so we call unblock to allow this client
            // to queue other method calls (see Meteor docs)
            this.unblock();
            var future=new Future();
            var command="ssh esme@137.74.175.30 \"mongo meteor --norc --quiet --eval 'db.tickets.find().forEach(printjson)'\" >>" + appData + "data.json";
            exec(command,function(error,stdout,stderr){
                if(error){
                    console.log(error);
                    throw new Meteor.Error(500,command+" failed");
                }
                future.return(stdout.toString());
            });
            return future.wait();
        },
        cron_insertData: function () {
            // This method call won't return immediately, it will wait for the
            // asynchronous code to finish, so we call unblock to allow this client
            // to queue other method calls (see Meteor docs)
            this.unblock();
            var future=new Future();
            var command="mongoimport -h localhost:3001 --db meteor --collection tickets --type json --file " + appData + "data.json";
            exec(command,function(error,stdout,stderr){
                if(error){
                    console.log(error);
                    throw new Meteor.Error(500,command+" failed");
                }
                future.return(stdout.toString());
            });
            return future.wait();
        }
    });

    // Start the Cron jobs
    SyncedCron.start();
});

SyncedCron.add({
    name: 'Insert data into local database',
    schedule: function(parser) {
        return parser.text('every 15 minutes');
    },
    job: function() {
        Meteor.call('cron_insertData');
    }
},
    {
        name: 'Import data into JSON file from remote database',
        schedule: function (parser) {
            return parser.text('every 15 minutes');
        },
        job: function () {
            Meteor.call('cron_retrieveData');
        }
    }
);