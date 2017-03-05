'use es6';

import {Map} from 'immutable';

import Coordinate from '../../data/Coordinate';
import CoordinateBuilder from '../../data/builders/CoordinateBuilder';
import RideEstimatesSearch from '../RideEstimatesSearch';

export default class RideEstimatesSearchBuilder {
  static build(json) {
    let args = Map();

    if (!('start' in json)) {
      throw new TypeError('start is not in the search');
    }

    let startCoordinate = CoordinateBuilder.build(json['start']);
    args = args.set('startCoordinate', startCoordinate);

    if (!('end' in json)) {
      throw new TypeError('end is not in the search');
    }

    let endCoordinate = CoordinateBuilder.build(json['end']);
    args = args.set('endCoordinate', endCoordinate);

    if (!('rideType' in json)) {
      throw new TypeError('rideType is not in the search');
    }

    let rideType = RideEstimatesSearchBuilder.validateRideType(json['rideType']);
    args = args.set('rideType', rideType);

    return new RideEstimatesSearch(args);
  }

  static validateRideType(rideType) {
    if (!Object.prototype.toString.call(rideType) === '[object String]') {
      throw new TypeError('rideType is not a string');
    }

    const rideTypes = [
      'lyft',
      'lyft_line',
      'lyft_plus',
    ];

    if (rideTypes.indexOf(rideType) === -1) {
      throw new RangeError('rideType must be either \'lyft\', \'lyft_line\', or \'lyft_plus\'');
    }

    return rideType;
  }
}
