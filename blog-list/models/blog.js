const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      content: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

blogSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = document._id.toString();
    if (returnedObj.comments) {
      returnedObj.comments.forEach((comment) => {
        comment.id = comment._id.toString();
        delete comment._id;
      });
    }
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
