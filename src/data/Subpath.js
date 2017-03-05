'use es6';

import {Enum} from "enumify";

export default class Subpath extends Enum {}
Subpath.initEnum({
  RIDE_TYPES: {
    value: 'ridetypes',
  },
  DRIVER_ETA: {
    value: 'eta',
  },
  RIDE_ESTIMATES: {
    value: 'cost',
  },
  NEARBY_DRIVERS: {
    value: 'drivers',
  },
});
