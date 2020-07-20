const { GraphQLScalarType, GraphQLError, Kind } = require('graphql');

const parseTimeIntoPairOfInts = (value) =>
  value.split(':', 2).map((value) => parseInt(value));

const isCorrectFormat = (value) =>
  /^((2[0-3])|([0-1][0-9])):[0-5][0-9]$/g.test(value);

const parseTimeValue = (value) => {
  if (typeof value === 'string' && isCorrectFormat(value))
    return parseTimeIntoPairOfInts(value);

  throw new GraphQLError(
    `Given value ${value} is not a valid Time. Must be a String of valid format "HH:mm" and between 00:00-23:59.`
  );
};

const parseTimeLiteral = (ast) => {
  if (ast.kind === Kind.STRING && isCorrectFormat(ast.value))
    return parseTimeIntoPairOfInts(ast.value);

  throw new GraphQLError(
    `Given value ${value} is not a valid Time. Must be a String of valid format "HH:mm" and between 00:00-23:59.`
  );
};

const serializeTime = (value) => {
  if (typeof value === 'string' && isCorrectFormat(value)) return value;

  throw new GraphQLError(
    `Returned value ${value} is not a valid Time. Must be a String of valid format "HH:mm" and between 00:00-23:59.`
  );
};

const Time = new GraphQLScalarType({
  name: 'Time',
  description: 'A Time scalar',
  serialize: serializeTime,
  parseValue: parseTimeValue,
  parseLiteral: parseTimeLiteral,
});

module.exports = Time;
