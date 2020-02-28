const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const bcrypt = require('bcryptjs');

const myFunction = async () => {
    try {
        const password = 'Red12345!';
        const hashedPassword = await bcrypt.hash(password, 8);

        console.log(password);
        console.log(hashedPassword);

        const isMatch = await bcrypt.compare('Red12345!', hashedPassword);
        console.log(isMatch);
    } catch (ex) {
        console.log(ex);
    }
}

myFunction();

app.listen(port, () => console.log(`Server is up on port ${port}`));