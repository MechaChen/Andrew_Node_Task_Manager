const express = require('express');
const Task = require('../models/task');

const router = new express.Router();

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        const savedTask = await task.save();
        res.status(201).send(savedTask);
    } catch (ex) {
        res.status(400).send(ex);
    }
});

router.get('/tasks', async (req, res) => {

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

router.get('/tasks/:id', async (req, res) => {
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

// 
// Goal: Change how tasks are updated
// 
// 1. Find the task
// 2. Alter the task properties
// 3. Save the task
// 4. Test your work by updating a task from Postman

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const task = await Task.findById(req.params.id);
        
        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/tasks/:id', async (req, res) => {
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

module.exports = router;