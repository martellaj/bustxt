var Config = require('../config');
var moment = require('moment');
var momentTimezone = require('moment-timezone');
var twilio = require('twilio');
var client = twilio(Config.TWILIO_ACCOUNT_SID, Config.TWILIO_API_KEY);
function sendSmsMessage(busData) {
    var messageBody = formatMessageText(busData);
    // client.sendMessage({
    //   to: Config.TO_NUMBER,
    //   from: Config.FROM_NUMBER,
    //   body: messageBody
    // }, function(error, response) {
    //   if (error) {
    //     // TODO: Handle error.
    //     return;
    //   }
    //   // TODO: Log successful SMS sent.
    //   console.log('Successfully texted about a bus.');
    // });
}
exports.sendSmsMessage = sendSmsMessage;
function formatMessageText(busData) {
    var message = "";
    var isEarly = busData.msToArrival < 0;
    var minutesToArrival = isEarly ? Math.round((-1 * busData.msToArrival) / 60000) : Math.round(busData.msToArrival / 60000);
    var arrivalTime = moment(busData.arrivalDateTime);
    var arrivalTimePst = momentTimezone.tz(arrivalTime, 'PST');
    message = "";
    return message;
}
//# sourceMappingURL=TwilioFactory.js.map