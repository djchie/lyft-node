'use es6';

import {Map, Record} from 'immutable';

import Coordinate from '../data/Coordinate';

let defaults = {
  startCoordinate: new Coordinate(),
  endCoordinate: undefined,
  rideType: undefined,
};

export default class DriverEtaSearch extends Record(defaults) {
  toParameters(search) {
    return Map({
      lat: this.startCoordinate.lat,
      lng: this.startCoordinate.lng,
      destination_lat: this.endCoordinate ? this.endCoordinate.lat : undefined,
      destination_lng: this.endCoordinate ? this.endCoordinate.lng : undefined,
      ride_type: this.rideType,
    });
  }
}
