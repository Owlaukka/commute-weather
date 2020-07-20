const { GraphQLScalarType, GraphQLError } = require('graphql');
const dayjs = require('dayjs');

const parseDatetimeValue = (value) => {
  if (typeof value === 'string' && dayjs(value).isValid()) return value;

  throw new GraphQLError(`Given value ${value} is not a valid Datetime.`);
};

const parseDatetimeLiteral = (ast) => {
  if (ast.kind === Kind.STRING && dayjs(ast.value).isValid()) return ast.value;

  throw new GraphQLError(`Given value ${value} is not a valid Datetime.`);
};

const serializeDatetime = (value) => {
  if (typeof value === 'string' && dayjs(value).isValid()) return value;

  throw new GraphQLError(`Returned value ${value} is not a valid Datetime.`);
};

const Datetime = new GraphQLScalarType({
  name: 'Datetime',
  description: 'A Datetime scalar',
  serialize: serializeDatetime,
  parseValue: parseDatetimeValue,
  parseLiteral: parseDatetimeLiteral,
});

module.exports = Datetime;
