require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate('5d9ec2c518a0fd0819b1b060', { age: 18 }).then((user) => {
    console.log(user);
    return User.countDocuments({ age: 18 });
}).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
});