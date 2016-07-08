import Config = require('../config');
import { IArrivalTimeResponse } from '../models/IArrivalTimeResponse';
import moment = require('moment');
import momentTimezone = require('moment-timezone');

let twilio = require('twilio');
let client = twilio(Config.TWILIO_ACCOUNT_SID, Config.TWILIO_API_KEY);

export function sendSmsMessage (busData: IArrivalTimeResponse) {
  let messageBody = formatMessageText(busData);

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

function formatMessageText (busData: IArrivalTimeResponse): string {
  let message = ``;
  let isEarly: boolean = busData.msToArrival < 0;
  let minutesToArrival: number = isEarly ? Math.round((-1 * busData.msToArrival) / 60000) : Math.round(busData.msToArrival / 60000);
  let arrivalTime = moment(busData.arrivalDateTime);
  let arrivalTimePst = momentTimezone.tz(arrivalTime, 'PST');

  message = ``;
  return message;
}