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

    // db.collection('users')
    //     .updateOne(
    //         { _id: new ObjectID('5d9970c6b23cde05c2988073')},
    //         { $inc: {
    //             age: 1,
    //         } },
    //     ).then((result) => {
    //         console.log(result);
    //     }).catch((error) => {
    //         console.log(error);
    //     });

    // 
    // Goal: Use updateMany to complete all tasks
    // 
    // 1. Check the documentation for updateMany
    // 2. Setup the call with the query and the updates
    // 3. Use promise methods to setup the success/error handlers
    // 4. Test your work!

    db.collection('tasks')
        .updateMany(
            { completed: false }, 
            { $set: { completed: true } })
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });
});
