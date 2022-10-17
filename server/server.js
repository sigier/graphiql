const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/schema");
const { Query } = require('./graphql/resolvers/query');
const { Mutation } = require('./graphql/resolvers/mutation');
const mongoose = require("mongoose");

const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers:{
        Query,
        Mutation
    },
    context: ({ req }) => {
        return {req};
    }
});

server.applyMiddleware({app});
const PORT = process.env.PORT || 5000;

mongoose.connect(`mongodb+srv://tuejtj3r93:XS7CilmpAsoLwT0r@cluster0.sswe9bn.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true,
    useFindAndModify: false
}).then(() =>{
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}).catch( err => {
    console.log(err);
});

