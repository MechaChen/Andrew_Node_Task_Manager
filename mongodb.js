const { MongoClient, ObjectID } = require('mongodb');
const moment  = require('moment');

const url = 'mongodb://127.0.0.1/27017';
const dbName = 'task-manager';
const id = new ObjectID();

MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return error;
    }

    const db = client.db(dbName);

    db.collection('users')
        .deleteMany({
            name: 'My First name'
        }).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
});
