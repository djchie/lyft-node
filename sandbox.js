'use es6';

const dotenv = require('dotenv');

const Lyft = require('./build/index').default;

dotenv.load();


const lyft = new Lyft(process.env.LYFT_CLIENT_ID, process.env.LYFT_CLIENT_SECRET)

const query = {
  start: {
    latitude: 37.7833,
    longitude: -122.4167,
  },
  end: {
    latitude: 37.7922,
    longitude: -122.4012,
  },
  rideType: 'lyft_line',
};

const query = {
  start: {
    latitude: 37.7833,
    longitude: -122.4167,
  },
  end: {
    latitude: 37.7922,
    longitude: -122.4012,
  },
  rideType: 'lyft_line',
};

// lyft.getRideTypes(query)
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// lyft.getNearbyDrivers(query)
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// lyft.getDriverEta(query)
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

lyft.getRideEstimates(query)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
