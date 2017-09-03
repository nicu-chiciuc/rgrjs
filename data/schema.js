import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql'

let data = [
  { counter: 543 },
  { counter: 1 },
  { counter: 89 },
  { counter: 3 },
]

const Schema = db => {
  const linkType = new GraphQLObjectType({
    name: 'Counter',
    fields: () => ({
      _id: { type: GraphQLString },
      title: { type: GraphQLString },
      url: { type: GraphQLString },
    }),
  })

  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        links: {
          type: new GraphQLList(linkType),
          resolve: () =>
            db
              .collection('links')
              .find({})
              .toArray(),
        },
      }),
    }),
  })
  return schema
}

export default Schema
