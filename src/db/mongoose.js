const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { 
    useNewUrlParser: true,
    useCreateIndex: true,
});

// 
// Goal: Create a model for tasks
// 
// 1. Define the model with description and completed fields
// 2. Create a new instance of the model
// 3. Save the model to the database
// 4. Test your work!

const Task = new mongoose.model('Task', {
    description: { type: String },
    completed: { type: Boolean },
});

const task = new Task({
    description: 'task',
    completed: true,
});

task.save()
    .then((task) => console.log(task))
    .catch((err) => console.log(err));