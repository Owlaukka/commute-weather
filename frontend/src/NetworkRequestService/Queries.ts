import { DocumentNode } from '@apollo/client';

const { gql } = require('@apollo/client');

const WEATHER_QUERY: DocumentNode = gql`
  query Weather(
    $lat: Float!
    $lon: Float!
    $time: Time!
    $requestedAt: String!
  ) {
    weather(lat: $lat, lon: $lon, time: $time, requestedAt: $requestedAt) {
      time
      temperature {
        isDaily
        temp
        min
        max
      }
      weather {
        main
        icon
      }
      humidity
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { WEATHER_QUERY };
