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

    // 
    // Goal: Insert 3 tasks into a new task collection
    // 
    // 1. Use insertMany  to insert three documents
    //    - description (string), completed (boolean)
    // 2. Setup the callback to handle error or print ops
    // 3. Run the script
    // 4. Refresh the database in Robo 3t and view data in tasks collection

    db
        .collection('tasks')
        .insertMany([
           {
                description: 'Task 1',
                completed: false,
           },
           {
                description: 'Task 2',
                completed: true,
           },
           {
                description: 'Task 3',
                completed: false,
           }
        ], (error, result) => {
            if (error) {
                return console.log('Uable to insert into Task collection');
            }

            console.log(result.ops);
        });
});