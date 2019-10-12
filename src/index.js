const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// 
// Goal: Create task router
// 
// 1. Setup new file the creates/exports new router
// 2. Move all the task routes over
// 3. Load in an use that router with the express app
// 4. Test your work

app.listen(port, () => console.log(`Server is up on port ${port}`));