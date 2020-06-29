const weatherResolver = require('./weather');

const rootResolver = {
  ...weatherResolver,
};

module.exports = rootResolver;
