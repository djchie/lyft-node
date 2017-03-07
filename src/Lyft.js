'use es6';

import rp from 'request-promise';

import Subpath from './data/Subpath';

import CoordinateBuilder from './data/builders/CoordinateBuilder';

import RideTypesSearchBuilder from './search/builders/RideTypesSearchBuilder';
import DriverEtaSearchBuilder from './search/builders/DriverEtaSearchBuilder';
import RideEstimatesSearchBuilder from './search/builders/RideEstimatesSearchBuilder';
import NearbyDriversSearchBuilder from './search/builders/NearbyDriversSearchBuilder';

export default class Lyft {
  constructor(clientId, clientSecret) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;

    this.tokenType;
    this.accessToken;
    this.expiresIn;
    this.scope;

    this.expirationDate;
  }

  getAccessToken() {
    return rp({
      method: 'POST',
      uri: 'https://api.lyft.com/oauth/token',
      auth: {
        username: this.clientId,
        password: this.clientSecret,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        grant_type: 'client_credentials',
      },
      json: true,
      timeout: 5000,
    })
      .then(result => {
        this.tokenType = result.token_type;
        this.accessToken = result.access_token;
        this.expiresIn = result.expires_in;
        this.scope = result.scope;

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.expirationDate = tomorrow;

        return result;
      })
      .catch(function(err) {
        throw new Error(err);
      });
  }

  getRideTypes(search) {
    return this.execute(
      Subpath.RIDE_TYPES,
      RideTypesSearchBuilder.build(search).toParameters().toJS()
    );
  }

  getDriverEta(search) {
    return this.execute(
      Subpath.DRIVER_ETA,
      DriverEtaSearchBuilder.build(search).toParameters().toJS()
    );
  }

  getRideEstimates(search) {
    return this.execute(
      Subpath.RIDE_ESTIMATES,
      RideEstimatesSearchBuilder.build(search).toParameters().toJS()
    );
  }

  getNearbyDrivers(search) {
    return this.execute(
      Subpath.NEARBY_DRIVERS,
      NearbyDriversSearchBuilder.build(search).toParameters().toJS()
    );
  }

  async execute(subpath, parameters) {
    const options = await this.buildOptions(subpath, parameters);
    return rp(options)
      .then(result => result)
      .catch(function(err) {
        throw new Error(err);
      });
  }

  async buildOptions(subpath, parameters) {

    const nowDate = new Date();

    if (!this.tokenType || !this.accessToken || !this.expirationDate || nowDate > this.expirationDate) {
      await this.getAccessToken();
    }

    return {
      uri: `https://api.lyft.com/v1/${subpath.value}`,
      qs: parameters,
      headers: {
        Authorization: `${this.tokenType} ${this.accessToken}`,
      },
      json: true,
      timeout: 5000,
    };
  }
}
