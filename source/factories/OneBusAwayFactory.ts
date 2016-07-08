import request = require('request');
import Q = require('q');
import Config = require('../config');
import { IArrivalTimeResponse } from '../models/IArrivalTimeResponse';

const ROUTE_232_ID = `1_100124`;
const ROUTE_545_ID = `40_100236`;
const STOP_NUMBER = `1_71954`;
const GET_TRIPS_URL = `http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/${STOP_NUMBER}.json?key=${Config.OBA_API_KEY}`;
const GET_ETA_URL = `http://api.pugetsound.onebusaway.org/api/where/arrival-and-departure-for-stop/${STOP_NUMBER}.json?key=${Config.OBA_API_KEY}`;

interface Trip {
  tripId: string;
  routeId: string;
  routeShortName: string;
  predictedArrivalTime: number;
  scheduledArrivalTime: number;
  serviceDate: number;
  stopSequence: number;
  vehicleId: string;
}

/**
 * Gets trip ETA (in milliseconds) and whether or not said time is predicted.
 * @returns {IArrivalTimeResponse} Trip ETA information.
 */
export function getTripETA() {
  let deferred = Q.defer();

  getTripInformation().then(function (trip: Trip) {
    if (!trip) {
      // Return null because no trip was found.
      deferred.resolve(null);
    }

    let apiParams = `&tripId=${trip.tripId}&serviceDate=${trip.serviceDate}&vehicleId=${trip.vehicleId}&stopSequence=${trip.stopSequence}`;
    let obaRequest = {
      url: GET_ETA_URL + apiParams
    };

    request.get(obaRequest, function (error, response, body) {
      let _body = JSON.parse(body);

      if (_body.code === 200) {
        if (trip.predictedArrivalTime > 0) {
          // Return ETA based on prediction, if available.
          let response: IArrivalTimeResponse = {
            msToArrival: _body.data.entry.predictedArrivalTime - _body.currentTime,
            isPredicted: true
          };

          deferred.resolve(response);
        } else {
          // Return ETA based on schedule, if prediction isn't vailable.
          let response: IArrivalTimeResponse = {
            msToArrival: _body.data.entry.scheduledArrivalTime - _body.currentTime,
            isPredicted: false
          };

          deferred.resolve(response);
        }
      } else {
        deferred.resolve(null);
      }
    });
  });

  return deferred.promise;
}

/**
 * Returns trip information about the 232 arriving at RTC.
 * @returns {Trip} Object representing target trip.
 */
function getTripInformation() {
  let deferred = Q.defer();

  let obaRequest = {
    url: GET_TRIPS_URL
  };

  request.get(obaRequest, function (error, response, body) {
    let _body = JSON.parse(body);

    if (_body.code === 200) {
      for (let tripIterator = 0; tripIterator < _body.data.entry.arrivalsAndDepartures.length; tripIterator++) {
        let trip: Trip = _body.data.entry.arrivalsAndDepartures[tripIterator];
        if (trip.routeId === ROUTE_232_ID) {
          deferred.resolve(trip);
        }
      }

      // Return null because no 232 route was found.
      deferred.resolve(null);
    } else {
      // Return null because call failed.
      deferred.resolve(null);
    }
  });

  return deferred.promise;
}