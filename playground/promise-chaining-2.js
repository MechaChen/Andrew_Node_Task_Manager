require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete('5da054b14f1eba0182d01d28').then(() => {
    return Task.countDocuments({ completed: false });
}).then((count) => {
    console.log(count);
}).catch((err) => {
    console.log(err);
});
