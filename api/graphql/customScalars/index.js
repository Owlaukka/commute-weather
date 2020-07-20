const Datetime = require('./Datetime');
const Time = require('./Time');

// Add other scalar resolvers into this object
const customScalars = { Time, Datetime };

// Add additional scalar type declarations here
const scalarTypeDeclarations = `
  scalar Time
  scalar Datetime
`;

module.exports = { customScalars, scalarTypeDeclarations };
