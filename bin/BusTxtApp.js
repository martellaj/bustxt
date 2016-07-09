var http = require('http');
var scheduler = require('node-schedule');
var OneBusAwayFactory = require('./factories/OneBusAwayFactory');
var TwilioFactory = require('./factories/TwilioFactory');
// Logging message that app started properly.
console.log('>>> App is running...');
// Immediate block of action for development purposes.
var debugging = false;
if (debugging) {
    OneBusAwayFactory.getTripETA().then(function (busData) {
        if (!busData) {
            console.log('>>> No incoming 232 was located.');
        }
        else {
            console.log('>>> Milliseconds to arrival: ' + busData.msToArrival);
            console.log('>>> Predicted time: ' + busData.isPredicted);
            TwilioFactory.sendSmsMessage(busData);
        }
    });
}
// Rule to run action at 7:10 AM PST, Monday through Friday.
var rule = new scheduler.RecurrenceRule(null, null, null, [1, 2, 3, 4, 5], 14, 10, null);
scheduler.scheduleJob(rule, function () {
    console.log('>>> Getting bus schedule...');
    OneBusAwayFactory.getTripETA().then(function (response) {
        if (!response) {
            console.log('>>> No incoming 232 was located.');
        }
        else {
            console.log('>>> Milliseconds to arrival: ' + response.msToArrival);
            console.log('>>> Predicted time: ' + response.isPredicted);
        }
    });
});
// Server creation.
var port = process.env.PORT || 3000;
http.createServer(function (req, res) {
    console.log('>>> A request was made to the server.');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('bustxt will let you know when to go.\n');
}).listen(port);
//# sourceMappingURL=BusTxtApp.js.map