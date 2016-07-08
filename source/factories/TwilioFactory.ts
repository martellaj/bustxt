import Config = require('../config');
import { IArrivalTimeResponse } from '../models/IArrivalTimeResponse';
import moment = require('moment-timezone');

let twilio = require('twilio');
let client = twilio(Config.TWILIO_ACCOUNT_SID, Config.TWILIO_API_KEY);

export function sendSmsMessage (busData: IArrivalTimeResponse) {
  let messageBody = formatMessageText(busData);

  client.sendMessage({
    to: Config.TO_NUMBER,
    from: Config.FROM_NUMBER,
    body: messageBody
  }, function (error, response) {
    if (error) {
      // TODO: Handle error.
      return;
    }

    // TODO: Log successful SMS sent.
    console.log('Successfully texted about a bus.');
  });
}

function formatMessageText (busData: IArrivalTimeResponse): string {
  let message: string = ``;
  let minutesToArrival: number = Math.round(busData.msToArrival / 60000)
  let arrivalTimePst: string = moment(busData.arrivalDateTime).tz('America/Los_Angeles').format('h:mma');
  let isPredicted: boolean = busData.isPredicted;

  if (isPredicted) {
    message = `Your bus is ${minutesToArrival} minutes away. Be at the bus stop by ${arrivalTimePst}!`;
  } else {
    message = `Your bus doesn't have tracking info, but based on the schedule, it's ${minutesToArrival} away. Be at the bus stop by ${arrivalTimePst}!`;
  }

  return message;
}