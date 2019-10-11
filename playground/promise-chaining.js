require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findByIdAndUpdate('5d9ec2c518a0fd0819b1b060', { age: 18 }).then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 18 });
// }).then((count) => {
//     console.log(count);
// }).catch((e) => {
//     console.log(e);
// });

// 
// Goal: Mess around with promise chaining
// 
// 1. Create promise-chaining-2.js
// 2. Load in mongoose and task model
// 3. Remove a given task by id
// 4. Get and print the total number of incomplete tasks
// 5. Test your work!
