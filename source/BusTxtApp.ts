import http = require('http');
import scheduler = require('node-schedule');
import OneBusAwayFactory = require('./factories/OneBusAwayFactory');
import TwilioFactory = require('./factories/TwilioFactory');
import { IArrivalTimeResponse } from './models/IArrivalTimeResponse';

// Logging message that app started properly.
console.log('>>> App is running...');

// Immediate block of action for development purposes.
let debugging = false;
if (debugging) {
  OneBusAwayFactory.getTripETA().then(function (busData: IArrivalTimeResponse) {
    if (!busData) {
      console.log('>>> No incoming 232 was located.');
    } else {
      console.log('>>> Milliseconds to arrival: ' + busData.msToArrival);
      console.log('>>> Predicted time: ' + busData.isPredicted);
      TwilioFactory.sendSmsMessage(busData);
    }
  });
}

// Rule to run action at 7:10 AM PST, Monday through Friday.
let rule: scheduler.RecurrenceRule = new scheduler.RecurrenceRule(null, null, null, [1, 2, 3, 4, 5], 14, 10, null);
scheduler.scheduleJob(rule, function () {
  console.log('>>> Getting bus schedule...');
  OneBusAwayFactory.getTripETA().then(function (response: IArrivalTimeResponse) {
    if (!response) {
      console.log('>>> No incoming 232 was located.');
    } else {
      console.log('>>> Milliseconds to arrival: ' + response.msToArrival);
      console.log('>>> Predicted time: ' + response.isPredicted);
    }
  });
});

// Server creation.
let port = process.env.PORT || 3000;
http.createServer(function (req, res) {
  console.log('>>> A request was made to the server.');

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('bustxt will let you know when to go.\n');
}).listen(port);