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

const updateAgeAndCount = async (id, age) => {
    try {
        const user = await User.findByIdAndUpdate(id, { age });
        const count = await User.countDocuments({ age });
        console.log(count);
    } catch (e) {
        console.log(e);
    }
}

updateAgeAndCount('5d9ecd741a2a0f0a63268d24', 24);