require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('5da054b14f1eba0182d01d28').then(() => {
//     return Task.countDocuments({ completed: false });
// }).then((count) => {
//     console.log(count);
// }).catch((err) => {
//     console.log(err);
// });

// 
// Goal: User async/await
// 
// 1. Create deleteTaskAndCount as an async function
//    - Accept id task to remove
// 2. Use await to delete task and count up incomplete tasks
// 3. Return the count
// 4. Call the function and attach then/catch to log results
// 5. Test your work!

const deleteTaskAndCount = async (id) => {
    try {
        await Task.findByIdAndDelete(id);
        const count = await Task.countDocuments({ completed: false });
        console.log(count);
    } catch (e) {
        console.log(e);
    }
}

deleteTaskAndCount('5da08ef64f1eba0182d01d2a');