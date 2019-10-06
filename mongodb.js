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

    // 
    // Goal: Use find and findOne with tasks
    // 
    // 1. Use findOne to fetch the last task by its id (print doc to console)
    // 2. Use find to fetch all tasks that are not completed (print docs to console)
    // 3. Test your work!
    db.collection('tasks').findOne({ _id: new ObjectID('5d99eba64da18c0d3229a32a')}, (error, result) => {
        console.log(result);
    });

    db.collection('tasks').find({ completed: false }).toArray((error, docs) => {
        console.log(docs);
    });
});