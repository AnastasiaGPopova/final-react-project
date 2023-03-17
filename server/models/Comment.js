const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    ownerComment: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    recordId: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
