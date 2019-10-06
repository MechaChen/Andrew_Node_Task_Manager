// CRUD create read update delete

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const url = 'mongodb://127.0.0.1/27017';
const dbName = 'task-manager';

MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return error;
    }

    console.log('Connect to MongoDB server!');
});