const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        const savedTask = await task.save();
        res.status(201).send(savedTask);
    } catch (ex) {
        res.status(400).send(ex);
    }
});

// 
// Goal: Refactor GET /tasks
// 
// 1. Add authentication
// 2. Return tasks only for the authenticated user
// 3. Test your work!

router.get('/tasks', auth, async (req, res) => {

    try {
        await req.user.populate('tasks').execPopulate();

        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const findedTask = await Task.findOne({ _id, owner: req.user._id });

        if (!findedTask) {
            return res.status(404).send();
        }

        res.send(findedTask);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
        
        if (!task) {
            return res.status(404).send();
        }

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();

        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

// 
// Goal: Refactor DELETE /tasks/:id
// 
// 1. Add authentication
// 2. Find the task by _id/owner (findOneAndDelete)
// 3. Test your work!

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;