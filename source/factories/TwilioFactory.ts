import Config = require('../config');
import { IArrivalTimeResponse } from '../models/IArrivalTimeResponse';

let twilio = require('twilio');
let client = twilio(Config.TWILIO_ACCOUNT_SID, Config.TWILIO_API_KEY);

export function sendSmsMessage (busData: IArrivalTimeResponse) {
  client.sendMessage({
    to: Config.TO_NUMBER,
    from: Config.FROM_NUMBER,
    body: formatMessageText(busData)
  }, function(error, response) {
    if (error) {
      // TODO: Handle error.
      return;
    }

    // TODO: Log successful SMS sent.
    console.log('Successfully texted about a bus.');
  });
}

function formatMessageText (busData: IArrivalTimeResponse): string {
  let message = `Your bus will arrive in ${busData.msToArrival} ms.`;
  return message;
}