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
    // Goal: Use deleteOne to remove a task
    // 
    // 1. Grab the description for the task you want to remove
    // 2. Setup the call with the query
    // 3. Use promise methods to setup the success/error handlers
    // 4. Test your work!

    db.collection('tasks').deleteOne({
        description: 'Task 5'
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
});
