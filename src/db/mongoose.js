const mongoose = require('mongoose');
const chalk = require('chalk');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { 
    useNewUrlParser: true,
    useCreateIndex: true,
});

const User = mongoose.model('User', {
    name: {
        type: String,
        required: [true, 'There is no user without name'],
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
});

const user = new User({
    name: 'Benson1',
    age: -1,
});

user.save()
    .then((user) => console.log(user))
    .catch((err) => console.log(chalk.bgRed(err.message)));