# weekly34
graphql react 

### mongodb atlas

#### Security
##### Databases:
db: notes
user: dbuser
pass: dbuser

##### Network Access:
Ip Access List: 
Access IP Address: current ip address 

https://cloud.mongodb.com/

---------

- Makefile
```
init:
	nvm use 14; npm -y init; touch index.js; npm i apollo-server graphql mongoose
```

- index.js
```js
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
```

- url
```
http://localhost:12000/
```

```
query {
  sayHi
}
```

---------

### mongoose connect

#### mongodb atlas

https://cloud.mongodb.com/

Cluster0 -> connect
```
mongodb+srv://dbuser:<password>@cluster0.aob2c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

Create a dababase
Create a collection
Add My Own Data
notesdb -> posts
insert document
{ "id": 'p80979',
  "body": "Hope this help",
  "username": "Sting",
  "createdAt": "123456"
  }


- index.js
```js
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

```
- config.js
```js
module.exports = {
  MONGODB: `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.aob2c.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
}
```

- Post.js
```js
const { model, Schema} = require('mongoose')

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [{
    body: String,
    username: String,
    createdAt: String
  }],
  likes: [{
    username: String,
    createdAt: String,
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

module.exports = model('Post', postSchema)
```

- User.js
```js
const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String
})

module.exports = model('User', userSchema)
```

- Makefile
```
init:
	nvm use 14; npm -y init; touch index.js; npm i apollo-server graphql mongoose

start:
	DBNAME=notesdb DBUSER=dbuser DBPASS=dbuser1234 node index.js
```

```
query {
  getPosts{
    id
    body
    username
    createdAt
  }
}
```




REFERENCE:


https://www.youtube.com/watch?v=n1mdAPFq2Os
