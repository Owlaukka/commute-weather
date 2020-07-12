const { mergeTypeDefs } = require('@graphql-tools/merge');

const weatherType = require('./weatherType');

// Add additional types and mutations here
const types = [weatherType];

module.exports = mergeTypeDefs(types);
