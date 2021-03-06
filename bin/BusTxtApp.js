var http = require('http');
var scheduler = require('node-schedule');
var OneBusAwayFactory = require('./factories/OneBusAwayFactory');
var TwilioFactory = require('./factories/TwilioFactory');
var winston = require('winston');
// Configure logger.
winston.add(winston.transports.File, { filename: 'bustxt.log' });
winston.info('Application has started running.');
// Immediate block of action for development purposes.
var debugging = false;
if (debugging) {
    OneBusAwayFactory.getTripETA().then(function (busData) {
        if (!busData) {
            winston.warn('No incoming 232 bus was found.');
        }
        else {
            winston.info('Minutes to 232 arrival: ' + busData.minutesToArrival);
            winston.info('Arrival time predicted: ' + busData.isPredicted);
            TwilioFactory.sendSmsMessage(busData);
            // Try again in 5 minutes if no real-time data came in.
            if (!busData.isPredicted) {
                winston.info('No real-time data found. Will try again in 5 minutes.');
                setTimeout(function () {
                    winston.info('Trying to find real-time data.');
                    OneBusAwayFactory.getTripETA().then(function (busData) {
                        if (!busData) {
                            winston.warn('No incoming 232 bus was found.');
                        }
                        else {
                            winston.info('Minutes to 232 arrival: ' + busData.minutesToArrival);
                            winston.info('Arrival time predicted: ' + busData.isPredicted);
                            TwilioFactory.sendSmsMessage(busData);
                        }
                    });
                }, 300000 /* 5 minutes */);
            }
        }
    });
}
// Rule to run action at 7:10 AM PST, Monday through Friday.
var rule = new scheduler.RecurrenceRule(null, null, null, [1, 2, 3, 4, 5], 14, 10, null);
scheduler.scheduleJob(rule, function () {
    winston.info('Job started.');
    OneBusAwayFactory.getTripETA().then(function (busData) {
        if (!busData) {
            winston.warn('No incoming 232 bus was found.');
        }
        else {
            winston.info('Minutes to 232 arrival: ' + busData.minutesToArrival);
            winston.info('Arrival time predicted: ' + busData.isPredicted);
            TwilioFactory.sendSmsMessage(busData);
            // Try again in 5 minutes if no real-time data came in.
            if (!busData.isPredicted) {
                winston.info('No real-time data found. Will try again in 5 minutes.');
                setTimeout(function () {
                    winston.info('Trying to find real-time data.');
                    OneBusAwayFactory.getTripETA().then(function (busData) {
                        if (!busData) {
                            winston.warn('No incoming 232 bus was found.');
                        }
                        else {
                            winston.info('Minutes to 232 arrival: ' + busData.minutesToArrival);
                            winston.info('Arrival time predicted: ' + busData.isPredicted);
                            TwilioFactory.sendSmsMessage(busData);
                        }
                    });
                }, 300000 /* 5 minutes */);
            }
        }
    });
});
// Server creation.
var port = process.env.PORT || 3000;
http.createServer(function (req, res) {
    winston.info('A request was made to the server.');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('bustxt will let you know when to go.\n');
}).listen(port);
//# sourceMappingURL=BusTxtApp.js.map