const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    writtenBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    news: {
        type: mongoose.Types.ObjectId,
        ref: 'news',
        required: true
    }
});

module.exports = mongoose.model('comments', commentSchema);