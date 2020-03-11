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
// Goal: Setup support for skip
// 
// 1. Setup "skip" option
//    -- Parse query value to integer
// 2. Fire off some requests to test it's working
//    - Fetch the 1st page of 2 and then the 3rd page of 2
//    - Fetch the 1st page of 3 and then the 2nd page of 3


// GET /tasks?completed=true
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt_desc
router.get('/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};

    if (req.query.completed) {
        match.completed = req.query.completed === 'true';
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();

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