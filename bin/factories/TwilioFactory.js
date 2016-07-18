var Config = require('../config');
var moment = require('moment-timezone');
var winston = require('winston');
var twilio = require('twilio');
var client = twilio(Config.TWILIO_ACCOUNT_SID, Config.TWILIO_API_KEY);
function sendSmsMessage(busData) {
    var messageBody = formatMessageText(busData);
    client.sendMessage({
        to: Config.TO_NUMBER,
        from: Config.FROM_NUMBER,
        body: messageBody
    }, function (error, response) {
        if (error) {
            // Log error.
            winston.error(error.message);
            return;
        }
        // Log successful SMS sent.
        winston.info('Successfully texted about a bus.', { minutesToArrival: busData.minutesToArrival, isPredicted: busData.isPredicted });
    });
}
exports.sendSmsMessage = sendSmsMessage;
function formatMessageText(busData) {
    var message = "";
    var arrivalTimePst = moment(busData.arrivalDateTime).tz('America/Los_Angeles').format('h:mma');
    var isPredicted = busData.isPredicted;
    if (isPredicted) {
        message = "Your bus is " + busData.minutesToArrival + " minutes away. Be at the bus stop by " + arrivalTimePst + "!";
    }
    else {
        message = "Your bus doesn't have tracking info, but based on the schedule, it's " + busData.minutesToArrival + " minutes away. Be at the bus stop by " + arrivalTimePst + "!";
    }
    return message;
}
//# sourceMappingURL=TwilioFactory.js.map