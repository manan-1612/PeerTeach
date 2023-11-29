const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    currentSem: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    batchYear: {
        type: Number,
        required: true
    }
});

const UserModel = mongoose.model("students", UserSchema);
module.exports = UserModel;
