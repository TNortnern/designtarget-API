const dotenv = require("dotenv");
// index.js, line 1:
dotenv.config();
const express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");
const { graphqlUploadExpress } = require("graphql-upload");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const isAuthed = require("./middleware/isAuthed");

const app = express();
const { setupDB } = require("./config/db");
setupDB();
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cors());
app.use(isAuthed);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => ({ req, res }), // now we can access express objects from apollo context arg
  playground: false,
  introspection: process.env.NODE_ENV === "production" ? false : true,
});
// const User = require("./models/User");

server.applyMiddleware({ app });

app.get("/", async function (req, res) {
  // res.json({ test: await require("./models/Resource").find({}) })
  res.send("API Running");
});

// const Resource = require("./models/Resource");

// const func = async () => {
//   await Resource.updateMany(
//     {
//       name: 'Pexels',
//     },
//     { url: 18 }
//   );
// };
// func();

const port = process.env.PORT || 5000;

app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
