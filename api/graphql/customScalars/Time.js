const { GraphQLScalarType, GraphQLError } = require('graphql');
const dayjs = require('dayjs');

const isTime = (value) => {
  console.log('111');
  const hours = value.split(':')[0];
  const minutes = value.split(':')[1];
  if (parseInt(hours) < 0 || parseInt(hours) > 24) return null;
  if (parseInt(minutes) < 0 || parseInt(minutes) > 60) return null;

  return value;
};

const Time = new GraphQLScalarType({
  name: 'Time',
  description: 'A Time scalar',
  serialize: isTime,
  parseValue: isTime,
  parseLiteral: (ast) => {
    console.log(ast);
    if (!isTime(ast.value))
      throw new GraphQLError(
        `Given value ${ast.value} is not a valid Datetime`
      );

    return ast.value;
  },
});

module.exports = Time;
