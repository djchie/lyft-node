'use es6';

import {Record} from 'immutable';

let defaults = {
  lat: 0,
  lng: 0,
};

export default class Coordinate extends Record(defaults) {}
