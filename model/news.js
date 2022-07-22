const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const newsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  publishedBy: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: false
  },
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'comment',
      required: true
    }
  ]
});

newsSchema.methods.addComment = function(commentId){
  this.comments.push(commentId)
}

module.exports = mongoose.model("news", newsSchema);