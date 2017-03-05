'use es6';

import {Map, Record} from 'immutable';

import Coordinate from '../data/Coordinate';

let defaults = {
  startCoordinate: new Coordinate(),
};

export default class NearbyDriversSearch extends Record(defaults) {
  toParameters(search) {
    return Map({
      lat: this.startCoordinate.lat,
      lng: this.startCoordinate.lng,
    });
  }
}
