const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
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
    semester: {
        type: Number,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    batch: {
        type: Number,
        required: true
    },
    otherDetails: {
        type: String,
        required: true
    },
    videoPath: {
        type: String,
    },
    notes: {
        type: String,
    }, // Store the file path to locate the video
    likec: {
        type: Number,
        default: 0,
    },
    dislikec: {
        type: Number,
        default: 0,
    },
    liked: [{
        type: String, // Store user emails who liked the video
    }],
    disliked: [{
        type: String, // Store user emails who disliked the video
    }],

});

const videoModel = mongoose.model("video", videoSchema);
module.exports = videoModel;
