const express = require('express');
require('./db/mongoose');
const User = require('./models/user');

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

app.listen(port, () => console.log(`Server is up on port ${port}`));