var Config = require('../config');
var twilio = require('twilio');
var client = twilio(Config.TWILIO_ACCOUNT_SID, Config.TWILIO_API_KEY);
function sendSmsMessage(busData) {
    client.sendMessage({
        to: Config.TO_NUMBER,
        from: Config.FROM_NUMBER,
        body: formatMessageText(busData)
    }, function (error, response) {
        if (error) {
            // TODO: Handle error.
            return;
        }
        // TODO: Log successful SMS sent.
        console.log('Successfully texted about a bus.');
    });
}
exports.sendSmsMessage = sendSmsMessage;
function formatMessageText(busData) {
    var message = "Your bus will arrive in " + busData.msToArrival + " ms.";
    return message;
}
//# sourceMappingURL=TwilioFactory.js.map