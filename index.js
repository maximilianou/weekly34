const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const typeDefs = gql`
  type Query{
    sayHi: String!
  }
`
const resolvers = {
  Query: {
    sayHi: () => `Hello Graph!`
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})
const port = 12000
server.listen({ port: 12000 })
      .then( res => {
        console.log(`Server running in ${res.url}`)
      })