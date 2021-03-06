var http = require('http');
var scheduler = require('node-schedule');
var OneBusAwayFactory = require('./OneBusAwayFactory');
console.log('>>> App is running.');
OneBusAwayFactory.getTripETA().then(function (response) {
    var _response = response;
    console.log('>>> Call works.');
});
var _rule = new scheduler.RecurrenceRule(null, null, null, null, null, 14, null);
scheduler.scheduleJob(_rule, function () {
    OneBusAwayFactory.getTripETA().then(function (response) {
        var _response = response;
        console.log(_response.msToArrival);
        console.log(_response.isPredicted);
    });
});
var rule = new scheduler.RecurrenceRule(null, null, null, null, 14, 10, null);
scheduler.scheduleJob(rule, function () {
    console.log('>>> Beginning notification task...');
});
var port = process.env.PORT || 3000;
http.createServer(function (req, res) {
    console.log('>>> A request was made to the server.');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, world!\n');
}).listen(port);
//# sourceMappingURL=server.js.map