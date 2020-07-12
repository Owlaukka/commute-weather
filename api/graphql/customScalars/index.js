const Datetime = require('../customScalars/Datetime');

// Add other scalar resolvers into this object
const customScalars = { Datetime };

// Add additional scalar type declarations here
const scalarTypeDeclarations = `
  scalar Datetime
`;

module.exports = { customScalars, scalarTypeDeclarations };
