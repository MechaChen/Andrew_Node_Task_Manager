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

//     console.log(id);
//     console.log(id.generationTime); // return timestamp in seconds
//     console.log(moment(id.generationTime * 1000).format('YYYY MMMM Do, h:mm:ss a')); // use timestamp in millsecond * 1000 to transfer into seconds
//     console.log(moment.unix(id.generationTime).format('YYYY MMMM Do, h:mm:ss a')); // use moment.unix() to transfer into seconds
//     console.log(id.getTimestamp());

//    const db = client.db(dbName);
   
//    db.collection('users').insertOne({
//        name: 'Betty',
//        age: 28,
//    }, (error, result) => {
//        console.log(result.ops);
//    });
});