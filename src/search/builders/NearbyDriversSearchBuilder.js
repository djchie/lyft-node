'use es6';

import {Map} from 'immutable';

import Coordinate from '../../data/Coordinate';
import CoordinateBuilder from '../../data/builders/CoordinateBuilder';
import NearbyDriversSearch from '../NearbyDriversSearch';

export default class NearbyDriversSearchBuilder {
  static build(json) {
    let args = Map();

    if (!('start' in json)) {
      throw new TypeError('start is not in the search');
    }

    let startCoordinate = CoordinateBuilder.build(json['start']);

    args = args.set('startCoordinate', startCoordinate);

    return new NearbyDriversSearch(args);
  }
}
