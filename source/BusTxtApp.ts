import http = require('http');
import scheduler = require('node-schedule');
import OneBusAwayFactory = require('./OneBusAwayFactory');
import { IArrivalTimeResponse } from './models/IArrivalTimeResponse';

console.log('>>> App is running...');

OneBusAwayFactory.getTripETA().then(function (response: IArrivalTimeResponse) {
  let _response = response;
});

let _rule: scheduler.RecurrenceRule = new scheduler.RecurrenceRule(null, null, null, null, null, 28, null);
scheduler.scheduleJob(_rule, function () {
  OneBusAwayFactory.getTripETA().then(function (response: IArrivalTimeResponse) {
    let _response = response;
    console.log(_response.msToArrival);
    console.log(_response.isPredicted);
  });
});

let rule: scheduler.RecurrenceRule = new scheduler.RecurrenceRule(null, null, null, null, 14, 10, null);
scheduler.scheduleJob(rule, function () {
  console.log('>>> Getting bus schedule...');
  OneBusAwayFactory.getTripETA().then(function (response: IArrivalTimeResponse) {
    let _response = response;
    console.log('>>> Milliseconds to arrival: ' + _response.msToArrival);
    console.log('>>> Predicted time: ' + _response.isPredicted);
  });
});

let port = process.env.PORT || 3000;
http.createServer(function (req, res) {
  console.log('>>> A request was made to the server.');

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, world!\n');
}).listen(port);