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
        const savedUser = await user.save();
        res.status(201).send(savedUser);
    } catch (ex) {
        res.status(400).send(ex);
    }
});

app.get('/users', async (req, res) => {
    try {
        const findedUsers = await User.find({});
        res.send(findedUsers);
    } catch (ex) {
        res.status(500).send();
    }
});

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const findedUser = await User.findById(_id);

        if (!findedUser) {
            res.status(404).send();
        }

        res.send(findedUser);
    } catch (e) {
        res.status(500).send(e);
    }
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