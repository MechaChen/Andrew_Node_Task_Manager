const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token  = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (ex) {
        res.status(400).send(ex);
    }
});

// 
// Goal: Have signup send back auth token
// 
// 1. Generate a token for the saved user
// 2. Send back both the token and the user
// 3. Create a new user from Postman and confirm the token is there

router.post('/users/login', async (req, res) => {
    try {
        // findByCredentials : (self-defined func) check by email & password
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

// 
// Goal: Create a way to logout of all sessions
// 
// 1. Setup POST /users/logoutAll
// 2. Create the router handler to wipe the tokens array
//    - Send 200 or 500
// 3. Test your work
//    - Login a few times and logout of all, Check database

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const user = await User.findById(req.params.id);

        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;