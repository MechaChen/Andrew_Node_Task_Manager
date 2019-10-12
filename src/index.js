const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./routers/user');

const app = express();
const port = process.env.PORT || 3000;

// parse the JSON response to Object
app.use(express.json());
app.use(userRouter);

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        const savedTask = await task.save();
        res.status(201).send(savedTask);
    } catch (ex) {
        res.status(400).send(ex);
    }
});

app.get('/tasks', async (req, res) => {

    try {
        const findedTasks = await Task.find({});

        if (!findedTasks) {
            return res.status(404).send();
        }

        res.send(findedTasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const findedTask = await Task.findById(_id);

        if (!findedTask) {
            return res.status(404).send();
        }

        res.send(findedTask);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.listen(port, () => console.log(`Server is up on port ${port}`));