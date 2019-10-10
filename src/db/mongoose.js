const mongoose = require('mongoose');
const chalk = require('chalk');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { 
    useNewUrlParser: true,
    useCreateIndex: true,
});

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
});

const user = new User({
});

user.save()
    .then((user) => console.log(user))
    .catch((err) => console.log(chalk.bgRed(err.message)));