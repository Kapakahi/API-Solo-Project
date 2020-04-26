const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross origin requests
app.use(cors());

mongoose.connect("mongodb+srv://Charles:charles12345@cluster0-zrwld.mongodb.net/test?retryWrites=true&w=majority");
mongoose.connection.once("open", () => {
  console.log("connected to database")
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Running a GraphQL API server at localhost:${PORT}`);
});