'use es6';

import {Map, Record} from 'immutable';

import Coordinate from '../data/Coordinate';

let defaults = {
  startCoordinate: new Coordinate(),
  endCoordinate: undefined,
  rideType: undefined,
};

export default class RideEstimatesSearch extends Record(defaults) {
  toParameters(search) {
    return Map({
      start_lat: this.startCoordinate.lat,
      start_lng: this.startCoordinate.lng,
      end_lat: this.endCoordinate ? this.endCoordinate.lat : undefined,
      end_lng: this.endCoordinate ? this.endCoordinate.lng : undefined,
      ride_type: this.rideType,
    });
  }
}
