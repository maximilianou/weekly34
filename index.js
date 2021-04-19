const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')

const Post = require('./models/Post')
const { MONGODB } = require('./config')

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Query{
    sayHi: String,
    getPosts: [Post]
  }
`
const resolvers = {
  Query: {
    sayHi: () => `Hello Graph!`,
    getPosts: async () => {
      try{
        const posts = await Post.find()
        return posts
      } catch (err) {
        throw new Error(err)
      }
    }

  }
}
const server = new ApolloServer({
  typeDefs,
  resolvers
})

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
        .then( () => {
          console.log(`MongoDB connected!`);
          return server.listen({ port: 12000 })
        })
        .then( res => {
          console.log(`Server running in ${res.url}`)
        })
