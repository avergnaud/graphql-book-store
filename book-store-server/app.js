const express = require('express');
const mongoose = require('mongoose');

const { ApolloServer } = require('apollo-server');

/* Mongo */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB || 'mongodb://localhost:27017/bookstore');
mongoose.connection.on('connected', () => console.log('Connected to mongo'));
mongoose.connection.on('error', e => console.log(`Aw shoot mongo --> ${e}`));

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
});
mongoose.model('Book', BookSchema);

/* GraphQL */
const typeDefs = require('./schema');
const resolvers = require('./resolver');

const server = new ApolloServer({
    typeDefs,
    resolvers
});
server.listen();
