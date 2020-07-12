const { GraphQLScalarType, GraphQLError } = require('graphql');
const dayjs = require('dayjs');

const isDateTime = (value) => (dayjs(value).isValid() ? value : null);

const Datetime = new GraphQLScalarType({
  name: 'Datetime',
  description: 'A Datetime scalar',
  serialize: isDateTime,
  parseValue: isDateTime,
  parseLiteral: (ast) => {
    if (!dayjs(ast.value).isValid())
      throw new GraphQLError(
        `Given value ${ast.value} is not a valid Datetime`
      );

    return ast.value;
  },
});

module.exports = Datetime;
