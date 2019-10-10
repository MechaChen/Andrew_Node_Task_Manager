const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

// parse the JSON response to Object
app.use(express.json());

app.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        const member = await user.save();
        res.send(member);
    } catch (ex) {
        res.status(400).send(ex);
    }
});

// 
// Goal: Setup the task creation endpoint
// 
// 1. Create a seperate file for task model (load it into index.js)
// 2. Create the task creation endpoint (handle success and error)
// 3. Test the endpoint from postman with good and bad data

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        const newTask = await task.save();
        res.status(201).send(newTask);
    } catch (ex) {
        res.status(400).send(ex);
    }
});

app.listen(port, () => console.log(`Server is up on port ${port}`));