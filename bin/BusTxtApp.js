var http = require('http');
var scheduler = require('node-schedule');
var OneBusAwayFactory = require('./factories/OneBusAwayFactory');
// Logging message that app started properly.
console.log('>>> App is running...');
// Immediate block of action for development purposes.
OneBusAwayFactory.getTripETA().then(function (response) {
    if (!response) {
        console.log('>>> No incoming 232 was located.');
    }
    else {
        console.log('>>> Milliseconds to arrival: ' + response.msToArrival);
        console.log('>>> Predicted time: ' + response.isPredicted);
    }
});
// Rule to run action at 7:10 AM PST.
var rule = new scheduler.RecurrenceRule(null, null, null, null, 14, 10, null);
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