const mongoose = require('mongoose');
const chalk = require('chalk');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { 
    useNewUrlParser: true,
    useCreateIndex: true,
});

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         trim: true,
//         required: [true, 'There is no user without name'],
//     },
//     email: {
//         type: String,
//         require: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is not valid');
//             }
//         }
//     },
//     password: {
//         type: String,
//         require: true,
//         trim: true,
//         minlength: 7,
//         validate(value) {
//             if (value.toLowerCase().includes('password')) {
//                 throw new Error('Your password can not contain the word "password"');
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error('Age must be a positive number');
//             }
//         }
//     },
// });

// const user = new User({
//     name: '   BENSON   ',
//     email: 'TUMLIVEIN@GMAIL.COM     ',
//     password: '78cxepaordwrixc',
// });
// 
// user.save()
//     .then((user) => console.log(user))
//     .catch((err) => console.log(chalk.bgRed(err.message)));


// 
// Goal: Add validation and sanization to task
// 
// 1. Trim the description and make it required
// 2. Make completed optional and default it to false
// 3. Test your work with and without errors

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

const task = new Task({
    description: 'New Task',
});

task.save()
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));