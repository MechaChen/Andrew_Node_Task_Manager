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

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (ex) {
        res.status(500).send();
    }
});

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;

    User.findById(_id)
        .then((user) => {
            if (!user) {
                res.status(404).send();
            }
            res.send(user);
        })
        .catch((ex) => {
            res.status(500).send(ex);
        });
});

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        const newTask = await task.save();
        res.status(201).send(newTask);
    } catch (ex) {
        res.status(400).send(ex);
    }
});

// 
// Goal: Setup the task reading endpoints
// 
// 1. Create an endpoint for fetching all tasks
// 2. Create an endpoint for fetching a task by its id
// 3. Setup new requests in Postman and test your work

app.get('/tasks', (req, res) => {
    Task.find({})
        .then((docs) => {
            if (!docs) {
                return res.status(404).send(docs);
            }
            res.send(docs);
        })
        .catch((ex) => {
            res.status(500).send(ex);
        });
});

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;

    Task.findById(_id)
        .then((doc) => {
            if (!doc) {
                return res.status(404).send();
            }
            res.send(doc);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

app.listen(port, () => console.log(`Server is up on port ${port}`));