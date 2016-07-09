var request = require('request');
var Q = require('q');
var Config = require('../config');
var ROUTE_232_ID = "1_100124";
var ROUTE_545_ID = "40_100236";
var STOP_NUMBER = "1_71954";
var GET_TRIPS_URL = "http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/" + STOP_NUMBER + ".json?key=" + Config.OBA_API_KEY;
var GET_ETA_URL = "http://api.pugetsound.onebusaway.org/api/where/arrival-and-departure-for-stop/" + STOP_NUMBER + ".json?key=" + Config.OBA_API_KEY;
/**
 * Gets trip ETA (in milliseconds) and whether or not said time is predicted.
 * @returns {IArrivalTimeResponse} Trip ETA information.
 */
function getTripETA() {
    var deferred = Q.defer();
    getTripInformation().then(function (trip) {
        if (!trip) {
            // Return null because no trip was found.
            deferred.resolve(null);
        }
        var apiParams = "&tripId=" + trip.tripId + "&serviceDate=" + trip.serviceDate + "&vehicleId=" + trip.vehicleId + "&stopSequence=" + trip.stopSequence;
        var obaRequest = {
            url: GET_ETA_URL + apiParams
        };
        request.get(obaRequest, function (error, response, body) {
            var _body = JSON.parse(body);
            if (_body.code === 200) {
                if (trip.predictedArrivalTime > 0) {
                    var msToArrival = _body.data.entry.predictedArrivalTime - _body.currentTime;
                    // Return ETA based on prediction, if available.
                    var response_1 = {
                        msToArrival: msToArrival,
                        minutesToArrival: Math.round(msToArrival / 60000),
                        isPredicted: true,
                        arrivalDateTime: _body.data.entry.predictedArrivalTime
                    };
                    deferred.resolve(response_1);
                }
                else {
                    var msToArrival = _body.data.entry.scheduledArrivalTime - _body.currentTime;
                    // Return ETA based on schedule, if prediction isn't vailable.
                    var response_2 = {
                        msToArrival: msToArrival,
                        minutesToArrival: Math.round(msToArrival / 60000),
                        isPredicted: false,
                        arrivalDateTime: _body.data.entry.scheduledArrivalTime
                    };
                    deferred.resolve(response_2);
                }
            }
            else {
                deferred.resolve(null);
            }
        });
    });
    return deferred.promise;
}
exports.getTripETA = getTripETA;
/**
 * Returns trip information about the 232 arriving at RTC.
 * @returns {Trip} Object representing target trip.
 */
function getTripInformation() {
    var deferred = Q.defer();
    var obaRequest = {
        url: GET_TRIPS_URL
    };
    request.get(obaRequest, function (error, response, body) {
        var _body = JSON.parse(body);
        if (_body.code === 200) {
            for (var tripIterator = 0; tripIterator < _body.data.entry.arrivalsAndDepartures.length; tripIterator++) {
                var trip = _body.data.entry.arrivalsAndDepartures[tripIterator];
                if (trip.routeId === ROUTE_232_ID) {
                    deferred.resolve(trip);
                }
            }
            // Return null because no 232 route was found.
            deferred.resolve(null);
        }
        else {
            // Return null because call failed.
            deferred.resolve(null);
        }
    });
    return deferred.promise;
}
//# sourceMappingURL=OneBusAwayFactory.js.map