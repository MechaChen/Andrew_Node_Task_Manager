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

    // MongoDB will automatically generate a database for us
    const db = client.db(dbName);

    db.collection('users').insertOne({
        name: 'My First name',
        age: 25,
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert user');
        }

        console.log(result.ops);
    });
});