const express = require('express');
const multer = require('multer');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        const token  = await user.generateAuthToken();
        await user.save();
        res.status(201).send({ user, token });
    } catch (ex) {
        res.status(400).send(ex);
    }
});

router.post('/users/login', async (req, res) => {
    try {
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

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e);
    }
});

// 
// Goal: Setup endpoint for avatar upload
// 
// 1. Add POST /users/me/avatar to user router
// 2. Setup multer to store uploads in an avatars directory
// 3. Choose name "avatar" for the key when registering the middleware
// 4. Send back a 200 response from route handler
// 5. Test your work. Create a new Task App request and upload image
const upload = multer({
    dest: 'avatars',
});

router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
    res.send();
});

module.exports = router;