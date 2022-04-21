import {ApolloServer, gql} from "apollo-server"
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core"
import {quote, user} from './fakedb.js'
const typeDefs = gql`
   type Query{
       user:[User]
       users(id:ID!):User
       quote:[Quote]
       iquote(by:ID!):[Quote]
   }
   type User{
       id: ID
       fristName: String
       LastName: String
       email: String
       password: String
       quote:[Quote]
       

   },
   type Quote{
       name: String
       by: ID
   }
`
const resolvers = {
    Query:{
        user:()=> user,
        users:(_, {id})=>user.find(users=>users.id == id),
        quote:()=>quote,
        iquote:(_, {by})=>quote.filter(quote=>quote.by == by),
    },
    User:{
        quote:(ur)=>quote.filter(quote=>quote.by == ur.id)
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
})

server.listen().then(({url})=>{
    console.log(`server ready to ${url}`)

})