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



REFERENCE:


https://www.youtube.com/watch?v=n1mdAPFq2Os
