const mongoose = require('mongoose');
const chalk = require('chalk');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { 
    useNewUrlParser: true,
    useCreateIndex: true,
});

// 
// Goal: Add a password field to User
// 
// 1. Setup the field as a required string
// 2. Ensure the length is greater than 6
// 3. Trim the password
// 4. Ensure that password doesn't contain "password"
// 5. Test your work!

const User = mongoose.model('User', {
    name: {
        type: String,
        trim: true,
        required: [true, 'There is no user without name'],
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid');
            }
        }
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Your password can not contain the word "password"');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
});

const user = new User({
    name: '   BENSON   ',
    email: 'TUMLIVEIN@GMAIL.COM     ',
    password: '78cxepaordwrixc',
});

user.save()
    .then((user) => console.log(user))
    .catch((err) => console.log(chalk.bgRed(err.message)));