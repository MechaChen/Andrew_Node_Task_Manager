const { MongoClient, ObjectID } = require('mongodb');
const moment  = require('moment');

const url = 'mongodb://127.0.0.1/27017';
const dbName = 'task-manager';
const id = new ObjectID();
console.log(id, id.id.length);
console.log(id.toHexString(), id.toHexString().length);
console.log(id);

MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return error;
    }

    const db = client.db(dbName);

    // collection.find() return a 'Cursor'

    db.collection('users').find({ age: 25 }).toArray((error, docs) => {
        console.log(docs);
    });

    db.collection('users').find({ age: 25 }).count((error, count) => {
        console.log(count);
    });
});