const time = require('../customScalars/Time');
const datetime = require('../customScalars/Datetime');

// Add other scalar resolvers into this object
const customScalars = [{ time, datetime }];

// Add additional scalar type declarations here
const scalarTypeDeclarations = `
  scalar Time
  scalar Datetime
`;

module.exports = { customScalars, scalarTypeDeclarations };
