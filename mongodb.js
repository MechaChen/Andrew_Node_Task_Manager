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
        .updateOne(
            { _id: new ObjectID('5d9970c6b23cde05c2988073')},
            { $set: {
                name: 'Joy',
            } },
        ).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
});